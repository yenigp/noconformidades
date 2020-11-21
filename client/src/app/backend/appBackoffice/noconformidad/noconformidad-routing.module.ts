import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListNoConformidadComponent } from './admin-list-noconformidad/admin-list-noconformidad.component';
import { CreateNoConformidadComponent } from './admin-list-noconformidad/noconformidad-create/noconformidad-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListNoConformidadComponent,
  },
  { path: 'edit', component: CreateNoConformidadComponent },
  { path: 'create', component: CreateNoConformidadComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminNoConformidadRoutingModule {}
