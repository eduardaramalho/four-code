import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { ClientComponent } from './client/client.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
//   {
//     path: 'user',
//     component: UserComponent,
//     // canActivate: [AuthGuard],
//     data: { roles: [Role.Admin]}
// } ,
// {
//     path: 'client',
//     component: ClientComponent,
//     // canActivate: [AuthGuard]
// },
// {
//     path: 'group',
//     component: GroupComponent,
//     // canActivate: [AuthGuard]
// },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
