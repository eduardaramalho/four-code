import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
<<<<<<< HEAD
// import { AuthGuard } from './_helpers';
// import { Role } from './_models';
=======
import { AuthGuard } from './_helpers';
import { Role } from './_models';
>>>>>>> 3480b4d972d4654c7aba26185808998c23cb4435
import { ClientComponent } from './client/client.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
<<<<<<< HEAD
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
=======
  {
    path: 'user',
    component: UserComponent,
    // canActivate: [AuthGuard],
    data: { roles: [Role.Admin]}
} ,
{
    path: 'client',
    component: ClientComponent,
    // canActivate: [AuthGuard]
},
{
    path: 'group',
    component: GroupComponent,
    // canActivate: [AuthGuard]
},
>>>>>>> 3480b4d972d4654c7aba26185808998c23cb4435
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
