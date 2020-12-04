import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListQuejasReclamacionesComponent } from './admin-list-quejasreclamaciones/admin-list-quejasreclamaciones.component';
import { CreateQuejasReclamacionesComponent } from './admin-list-quejasreclamaciones/quejasreclamaciones-create/quejasreclamaciones-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListQuejasReclamacionesComponent,
  },
  { path: 'edit', component: CreateQuejasReclamacionesComponent },
  { path: 'create', component: CreateQuejasReclamacionesComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminQuejasReclamacionesRoutingModule {}
