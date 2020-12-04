import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListPreguntasComponent } from './list-preguntas/list-preguntas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListPreguntasComponent,
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
export class AdminPreguntasRoutingModule {}
