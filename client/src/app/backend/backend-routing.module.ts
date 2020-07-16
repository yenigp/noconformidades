import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BackendFeaturesGuard } from './backend-features.guard';
import { Permisos } from 'src/app/core/classes/permisos';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () => import('./appBackoffice/admin-users/admin-users.module').then((m) => m.AdminUsersModule),
        canActivate: [BackendFeaturesGuard],
        data: { permissions: [Permisos.User] },
      },
      {
        path: 'projects',
        loadChildren: () => import('./appBackoffice/admin-projects/admin-projects.module').then((m) => m.AdminProjectsModule),
        canActivate: [BackendFeaturesGuard],
        data: { permissions: [Permisos.User] },
      },
      {
        path: 'empresas',
        loadChildren: () => import('./appBackoffice/admin-enterprises/admin-enterprises.module').then((m) => m.AdminEnterprisesModule),
        canActivate: [BackendFeaturesGuard],
        data: { permissions: [Permisos.User] },
      },
      {
        path: 'logs',
        loadChildren: () => import('./appBackoffice/admin-logs/admin-logs.module').then((m) => m.AdminLogsModule),
        canActivate: [BackendFeaturesGuard],
        data: { permissions: [Permisos.User] },
      },

      {
        path: 'deploys',
        loadChildren: () => import('./appBackoffice/admin-deploys/admin-deploys.module').then((m) => m.AdminDeploysModule),
        canActivate: [BackendFeaturesGuard],
        data: { permissions: [Permisos.User] },
      },

      //{%Reemplazor"bloque_rutaX"Here%}

    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackendRoutingModule { }


