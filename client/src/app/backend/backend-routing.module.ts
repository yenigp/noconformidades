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
        data: { role: [Role.SuperAdmin, Role.AdminEmpresa, Role.AdminSucursal] },
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
        path: 'quejasreclamaciones',
        loadChildren: () =>
          import('./appBackoffice/quejasreclamaciones/quejasreclamaciones.module').then(
            (m) => m.AdminQuejasReclamacionesModule,
          ),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'auditoria',
        loadChildren: () => import('./appBackoffice/auditoria/auditoria.module').then((m) => m.AdminAuditoriaModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'incidencia',
        loadChildren: () => import('./appBackoffice/incidencia/incidencia.module').then((m) => m.AdminIncidenciaModule),
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
        path: 'acciones',
        loadChildren: () => import('./appBackoffice/acciones/acciones.module').then((m) => m.AdminAccionesModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'tareas',
        loadChildren: () => import('./appBackoffice/tareas/tareas.module').then((m) => m.AdminTareasModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'indicadores',
        loadChildren: () =>
          import('./appBackoffice/indicadores/indicadores.module').then((m) => m.AdminIndicadoresModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'objetivos',
        loadChildren: () =>
          import('./appBackoffice/objetivoscalidad/objetivoscalidad.module').then((m) => m.AdminObjetivosCalidadModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'dictamen',
        loadChildren: () => import('./appBackoffice/dictamen/dictamen.module').then((m) => m.AdminDictamenModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'encuesta/:ID',
        loadChildren: () => import('./appBackoffice/encuesta/encuesta.module').then((m) => m.EncuestaModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'encuestas',
        loadChildren: () => import('./appBackoffice/encuestas/encuestas.module').then((m) => m.EncuestasModule),
        canActivate: [BackendFeaturesGuard],
        data: {},
      },
      {
        path: 'list',
        loadChildren: () => import('./appBackoffice/list/list.module').then((m) => m.ListModule),
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
