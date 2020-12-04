import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListTareasComponent } from './list-tareas/list-tareas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListTareasComponent,
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
export class AdminTareasRoutingModule {}
