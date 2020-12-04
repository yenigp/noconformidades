import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListIncidenciaComponent } from './admin-list-incidencia/admin-list-incidencia.component';
import { CreateIncidenciaComponent } from './admin-list-incidencia/incidencia-create/incidencia-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListIncidenciaComponent,
  },
  { path: 'edit', component: CreateIncidenciaComponent },
  { path: 'create', component: CreateIncidenciaComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminIncidenciaRoutingModule {}
