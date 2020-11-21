import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminExpedienteListComponent } from './expediente-list/expediente-list.component';
import { AdminExpedienteDetailsComponent } from './expediente-details/expediente-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminExpedienteListComponent,
  },
  {
    path: 'details/:expedienteId',
    component: AdminExpedienteDetailsComponent,
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
export class AdminExpedienteRoutingModule {}
