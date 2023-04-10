import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '../_models';

const users = [
    { id: 1, name: 'admin', username: 'admin', password: 'passwordadmin', cpassword: 'passwordadmin', role: Role.Admin },
    { id: 2, name: 'user', username: 'user', password: 'user', cpassword: 'user', role: Role.Comercial }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Usuário ou senha incorretos!');
            return ok({
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
            });
        }

        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser()?.id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function error(message: string) {
            return throwError(() => ({ status: 400, error: { message } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return currentUser()?.role === Role.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization')!.split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
