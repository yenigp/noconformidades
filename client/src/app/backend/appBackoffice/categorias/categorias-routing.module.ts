import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListCategoriasComponent } from './list-categorias/list-categorias.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListCategoriasComponent,
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
export class AdminCategoriasRoutingModule {}
