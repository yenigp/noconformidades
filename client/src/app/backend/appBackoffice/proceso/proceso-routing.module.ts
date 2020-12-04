import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListProcesoComponent } from './list-proceso/list-proceso.component';
import { MapaComponent } from './list-proceso/mapa/mapa.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListProcesoComponent,
  },
  { path: 'mapa', component: MapaComponent },
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
