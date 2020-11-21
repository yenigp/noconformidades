import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListProcesoComponent } from './list-proceso/list-proceso.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListProcesoComponent,
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
export class AdminProcesoRoutingModule {}
