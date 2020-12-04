import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListIndicadoresComponent } from './list-indicadores/list-indicadores.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListIndicadoresComponent,
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
export class AdminIndicadoresRoutingModule {}
