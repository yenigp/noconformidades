import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListDeploysComponent } from './admin-list-deploys/admin-list-deploys.component';
import { CreateProductComponent } from './admin-list-deploys/deploy-create/deploy-create.component';



const routes: Routes = [
  {
    path: '',
    component: AdminListDeploysComponent,
  },
  { path: 'edit', component: CreateProductComponent },
  { path: 'create', component: CreateProductComponent },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDeploysRoutingModule { }
