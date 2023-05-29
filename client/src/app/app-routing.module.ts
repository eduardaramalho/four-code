import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { Role } from './_models';
import { ClientComponent } from './client/client.component';
import { GroupComponent } from './group/group.component';

// const routes: Routes = [
//   {
//     path: 'user',
//     component: UserComponent,
//     data: { roles: [Role.Admin]}
// } ,
// {
//     path: 'client',
//     component: ClientComponent,
// },
// {
//     path: 'group',
//     component: GroupComponent,
// },
// ];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
