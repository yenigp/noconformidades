import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListAreaComponent } from './list-area/list-area.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListAreaComponent,
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
export class AdminAreaRoutingModule {}
