import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListUsersComponent } from './admin-list-users/admin-list-users.component';



const routes: Routes = [
  {
    path: '',
    component: AdminListUsersComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule { }
