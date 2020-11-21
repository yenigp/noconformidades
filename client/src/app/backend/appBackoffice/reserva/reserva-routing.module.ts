import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListReservaComponent } from './list-reserva/list-reserva.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListReservaComponent,
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
export class AdminReservaRoutingModule {}
