import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListUsuarioComponent } from './admin-list-usuario/admin-list-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListUsuarioComponent,
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
export class AdminUsuarioRoutingModule {}
