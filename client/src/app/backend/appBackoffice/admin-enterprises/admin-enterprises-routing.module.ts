import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEnterprisesListComponent } from './admin-enterprises-list/admin-enterprises-list.component';
import { AdminEnterprisesDetailsComponent } from './admin-enterprises-details/admin-enterprises-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEnterprisesListComponent,
  },
  {
    path: 'details/:enterpriseId',
    component: AdminEnterprisesDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEnterprisesRoutingModule { }
