import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListNormaComponent } from './list-norma/list-norma.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListNormaComponent,
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
export class AdminNormaRoutingModule {}
