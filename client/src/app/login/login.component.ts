import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  hide: boolean = true;
  isLogin: boolean = false;
  noToken: boolean = false;

  form!: FormGroup;
  constructor(
    private router: Router,
    private HttpClient: HttpClient,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.login();
    });
  }

  isValidForm(): boolean {
    return this.form.valid;
  }

  public login() {
    if (this.isValidForm()) {
      this.HttpClient.post('http://localhost:3003/logon', {
        username: this.username,
        password: this.password,
      })
        .toPromise()
        .then((response: any) => {
          if (response.token) {
            this.isLogin = true;
            window.localStorage.setItem('token', response.token);
            window.localStorage.setItem('permissao', response.user.permissao);
            this.router.navigateByUrl('');
            console.log('logado');
            console.log(response.user.permissao);
          }
        });
    }
  }
}
