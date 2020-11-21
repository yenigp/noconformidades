import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BackendFeaturesGuard } from './backend-features.guard';
import { Role } from 'src/app/core/classes/roles';
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
        path: 'norma',
        loadChildren: () => import('./appBackoffice/norma/norma.module').then((m) => m.AdminNormaModule),
        canActivate: [BackendFeaturesGuard],
        data: { role: [Role.EspCalidadEmpresa] },
      },
      {
        path: 'proceso',
        loadChildren: () => import('./appBackoffice/proceso/proceso.module').then((m) => m.AdminProcesoModule),
        canActivate: [BackendFeaturesGuard],
        data: { role: [Role.EspCalidadEmpresa] },
      },
      {
        path: 'tiponc',
        loadChildren: () => import('./appBackoffice/tiponc/tiponc.module').then((m) => m.AdminTipoNCModule),
        canActivate: [BackendFeaturesGuard],
        data: { role: [Role.EspCalidadEmpresa] },
      },
      {
        path: 'noconformidad',
        loadChildren: () =>
          import('./appBackoffice/noconformidad/noconformidad.module').then((m) => m.AdminNoConformidadModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'expediente',
        loadChildren: () => import('./appBackoffice/expediente/expediente.module').then((m) => m.AdminExpedienteModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'tipoac',
        loadChildren: () => import('./appBackoffice/tipoac/tipoac.module').then((m) => m.AdminTipoACModule),
        canActivate: [BackendFeaturesGuard],
        data: { role: [Role.EspCalidadEmpresa] },
      },
      {
        path: 'area',
        loadChildren: () => import('./appBackoffice/area/area.module').then((m) => m.AdminAreaModule),
        canActivate: [BackendFeaturesGuard],
        data: { role: [Role.EspRRHH] },
      },
      {
        path: 'turista',
        loadChildren: () => import('./appBackoffice/turista/turista.module').then((m) => m.AdminTuristaModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'reserva',
        loadChildren: () => import('./appBackoffice/reserva/reserva.module').then((m) => m.AdminReservaModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./appBackoffice/admin-usuario/admin-usuario.module').then((m) => m.AdminUsuarioModule),
        canActivate: [BackendFeaturesGuard],
        data: { role: [Role.SuperAdmin, Role.AdminEmpresa, Role.AdminSucursal] },
      },

      {
        path: 'logs',
        loadChildren: () => import('./appBackoffice/admin-logs/admin-logs.module').then((m) => m.AdminLogsModule),
        canActivate: [BackendFeaturesGuard],
        data: { role: [Role.SuperAdmin, Role.AdminEmpresa, Role.AdminSucursal] },
      },

      //{%Reemplazor"bloque_rutaX"Here%}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackendRoutingModule {}
