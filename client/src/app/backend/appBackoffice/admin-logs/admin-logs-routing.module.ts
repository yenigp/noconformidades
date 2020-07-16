import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLogTableComponent } from './admin-log-table/admin-log-table.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLogTableComponent,
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
export class AdminLogsRoutingModule { }
