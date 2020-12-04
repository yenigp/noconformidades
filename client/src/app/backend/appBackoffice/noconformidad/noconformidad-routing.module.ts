import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListNoConformidadComponent } from './admin-list-noconformidad/admin-list-noconformidad.component';
import { CreateNoConformidadComponent } from './admin-list-noconformidad/noconformidad-create/noconformidad-create.component';
import { ReporteComponent } from './admin-list-noconformidad/reporte/reporte.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListNoConformidadComponent,
  },
  { path: 'edit', component: CreateNoConformidadComponent },
  { path: 'create', component: CreateNoConformidadComponent },
  { path: 'reporte', component: ReporteComponent },
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
