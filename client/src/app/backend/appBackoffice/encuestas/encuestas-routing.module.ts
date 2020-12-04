import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestasComponent } from './encuesta/encuestas.component';
import { NuevaComponent } from './nueva/nueva.component';
import { EditComponent } from './edit/edit.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: EncuestasComponent,
  },
  { path: 'edit/:ID', component: EditComponent },
  { path: 'create', component: NuevaComponent },
  { path: 'result/:ID', component: ResultComponent },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncuestasRoutingModule {}
