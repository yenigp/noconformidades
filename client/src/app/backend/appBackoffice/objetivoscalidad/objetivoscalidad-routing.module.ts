import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListObjetivosCalidadComponent } from './list-objetivoscalidad/list-objetivoscalidad.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListObjetivosCalidadComponent,
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
export class AdminObjetivosCalidadRoutingModule {}
