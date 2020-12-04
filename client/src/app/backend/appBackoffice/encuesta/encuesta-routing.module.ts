import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaComponent } from './dashboard-encuesta/encuesta.component';

const routes: Routes = [
  {
    path: '',
    component: EncuestaComponent,
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
export class EncuestaRoutingModule {}
