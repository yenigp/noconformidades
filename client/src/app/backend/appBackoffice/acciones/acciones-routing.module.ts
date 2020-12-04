import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListAccionesComponent } from './admin-list-acciones/admin-list-acciones.component';
import { CreateAccionesComponent } from './admin-list-acciones/acciones-create/acciones-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListAccionesComponent,
  },
  { path: 'edit', component: CreateAccionesComponent },
  { path: 'create', component: CreateAccionesComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAccionesRoutingModule {}
