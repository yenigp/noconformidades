import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListTipoACComponent } from './list-tipoac/list-tipoac.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListTipoACComponent,
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
export class AdminTipoACRoutingModule {}
