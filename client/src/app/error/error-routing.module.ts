import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenAccessComponent } from './forbidden-access/forbidden-access.component';
import { OutdatedVersionComponent } from './outdated-version/outdated-version.component';
import { LostConexionComponent } from './lost-conexion/lost-conexion.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'acceso-prohibido',
    component: ForbiddenAccessComponent
  },
  {
    path: 'version-desactualizada',
    component: OutdatedVersionComponent
  },
  {
    path: 'conexion-perdida',
    component: LostConexionComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
