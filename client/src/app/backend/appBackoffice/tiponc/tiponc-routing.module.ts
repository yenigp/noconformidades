import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListTipoNCComponent } from './list-tiponc/list-tiponc.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListTipoNCComponent,
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
export class AdminTipoNCRoutingModule {}
