import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListDictamenComponent } from './list-dictamen/list-dictamen.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListDictamenComponent,
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
export class AdminDictamenRoutingModule {}
