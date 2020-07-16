import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListProjectsComponent } from './admin-list-projects/admin-list-projects.component';



const routes: Routes = [
  {
    path: '',
    component: AdminListProjectsComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProjectsRoutingModule { }
