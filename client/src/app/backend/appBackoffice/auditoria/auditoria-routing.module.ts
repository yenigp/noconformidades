import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListAuditoriaComponent } from './admin-list-auditoria/admin-list-auditoria.component';
import { CreateAuditoriaComponent } from './admin-list-auditoria/auditoria-create/auditoria-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListAuditoriaComponent,
  },
  { path: 'edit', component: CreateAuditoriaComponent },
  { path: 'create', component: CreateAuditoriaComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAuditoriaRoutingModule {}
