import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  loggedInUser: any;

  /***Especialista de Calidad de la Empresa */
  navECE: any[] = [
    {
      displayName: 'Nomencladores',
      type: 'NoConformidad',
      iconName: ['subject'],
      route: '',
      material: true,
      children: [
        {
          displayName: 'Norma',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/norma',
          material: true,
          children: [],
        },
        {
          displayName: 'Proceso',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/proceso',
          material: true,
          children: [],
        },
        {
          displayName: 'Tipo de No Conformidad',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/tiponc',
          material: true,
          children: [],
        },
        {
          displayName: 'Tipo de Acciones',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/tipoac',
          material: true,
          children: [],
        },
      ],
    },
    {
      displayName: 'Indicadores',
      type: 'No Conformidad',
      iconName: ['trending_up'],
      route: 'backend/indicadores',
      material: true,
      children: [],
    },
    {
      displayName: 'Objetivos',
      type: 'No Conformidad',
      iconName: ['emoji_objects'],
      route: 'backend/objetivos',
      material: true,
      children: [],
    },
    {
      displayName: 'Expediente',
      type: 'Agency',
      iconName: ['create_new_folder'],
      route: 'backend/expediente',
      material: true,
      children: [],
    },
    {
      displayName: 'No Conformidad',
      type: 'No Conformidad',
      iconName: ['work'],
      route: 'backend/noconformidad',
      material: true,
      children: [],
    },
  ];

  /***Administradores */
  navAdmin: any[] = [
    {
      displayName: 'Usuario',
      type: 'User',
      iconName: ['person'],
      route: 'backend/users',
      material: true,
      children: [],
    },

    {
      displayName: 'Logs',
      type: 'User',
      iconName: ['settings'],
      route: 'backend/logs',
      material: true,
      children: [],
    },
  ];

  /***Especialista de Calidad de la Sucursales */
  navECS: any[] = [
    {
      displayName: 'Datos de Turistas',
      type: 'NoConformidad',
      iconName: ['subject'],
      route: '',
      material: true,
      children: [
        {
          displayName: 'Turistas',
          type: 'No Conformidad',
          iconName: ['person_pin'],
          route: 'backend/turista',
          material: true,
          children: [],
        },
        {
          displayName: 'Reservas',
          type: 'No Conformidad',
          iconName: ['local_offer'],
          route: 'backend/reserva',
          material: true,
          children: [],
        },
      ],
    },
    {
      displayName: 'Expediente',
      type: 'Agency',
      iconName: ['create_new_folder'],
      route: 'backend/expediente',
      material: true,
      children: [],
    },
    {
      displayName: 'No Conformidad',
      type: 'No Conformidad',
      iconName: ['work'],
      route: ' ',
      material: true,
      children: [
        {
          displayName: 'No Conformidades',
          type: 'No Conformidad',
          iconName: ['sticky_note_2'],
          route: 'backend/noconformidad',
          material: true,
          children: [],
        },
        {
          displayName: 'Quejas y Reclamaciones',
          type: 'No Conformidad',
          iconName: ['sticky_note_2'],
          route: 'backend/quejasreclamaciones',
          material: true,
          children: [],
        },
        {
          displayName: 'Auditoría',
          type: 'No Conformidad',
          iconName: ['sticky_note_2'],
          route: 'backend/auditoria',
          material: true,
          children: [],
        },
        {
          displayName: 'Incidencia',
          type: 'No Conformidad',
          iconName: ['sticky_note_2'],
          route: 'backend/incidencia',
          material: true,
          children: [],
        },
      ],
    },
    {
      displayName: 'Dictamen',
      type: 'NoConformidad',
      iconName: ['event_note'],
      route: 'backend/dictamen',
      material: true,
      children: [],
    },
    {
      displayName: 'Acciones',
      type: 'NoConformidad',
      iconName: ['pending_actions'],
      route: 'backend/acciones',
      material: true,
      children: [],
    },
    {
      displayName: 'Tareas',
      type: 'NoConformidad',
      iconName: ['add_task'],
      route: 'backend/tareas',
      material: true,
      children: [],
    },
    {
      displayName: 'Encuestas',
      type: 'NoConformidad',
      iconName: ['event_note'],
      route: '',
      material: true,
      children: [
        {
          displayName: 'Encuestas',
          type: 'Encuestas',
          iconName: ['event_note'],
          route: 'backend/encuestas',
          material: true,
          children: [],
        },
        {
          displayName: 'Listado Encuesta',
          type: 'Encuestas',
          iconName: ['event_note'],
          route: 'backend/list',
          material: true,
          children: [],
        },
      ],
    },
  ];

  /***Auditor*/
  navAuditor: any[] = [
    {
      displayName: 'Expediente',
      type: 'Agency',
      iconName: ['create_new_folder'],
      route: 'backend/expediente',
      material: true,
      children: [],
    },
    {
      displayName: 'No Conformidad',
      type: 'No Conformidad',
      iconName: ['work'],
      route: ' ',
      material: true,
      children: [
        {
          displayName: 'Auditoria',
          type: 'No Conformidad',
          iconName: ['person_pin'],
          route: 'backend/auditoria',
          material: true,
          children: [],
        },
      ],
    },
  ];

  /***Supervisor*/
  navSupervisor: any[] = [
    {
      displayName: 'Expediente',
      type: 'Agency',
      iconName: ['create_new_folder'],
      route: 'backend/expediente',
      material: true,
      children: [],
    },
    {
      displayName: 'No Conformidad',
      type: 'No Conformidad',
      iconName: ['work'],
      route: ' ',
      material: true,
      children: [
        {
          displayName: 'Incidencia',
          type: 'No Conformidad',
          iconName: ['person_pin'],
          route: 'backend/incidencia',
          material: true,
          children: [],
        },
      ],
    },
  ];

  /***Especialista en RRHH */
  navRRHH: any[] = [
    {
      displayName: 'Nomencladores',
      type: 'NoConformidad',
      iconName: ['subject'],
      route: '',
      material: true,
      children: [
        {
          displayName: 'Área',
          type: 'Recurso Humanos',
          iconName: ['business'],
          route: 'backend/area',
          material: true,
          children: [],
        },
      ],
    },
  ];

  /***Super Admin*/
  navBackend: any[] = [
    {
      displayName: 'Nomencladores',
      type: 'NoConformidad',
      iconName: ['subject'],
      route: '',
      material: true,
      children: [
        {
          displayName: 'Norma',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/norma',
          material: true,
          children: [],
        },
        {
          displayName: 'Proceso',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/proceso',
          material: true,
          children: [],
        },
        {
          displayName: 'Tipo de No Conformidad',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/tiponc',
          material: true,
          children: [],
        },
        {
          displayName: 'Tipo de Acciones',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/tipoac',
          material: true,
          children: [],
        },
        {
          displayName: 'Área',
          type: 'Recurso Humanos',
          iconName: ['business'],
          route: 'backend/area',
          material: true,
          children: [],
        },
      ],
    },
    {
      displayName: 'Datos de Turistas',
      type: 'NoConformidad',
      iconName: ['subject'],
      route: '',
      material: true,
      children: [
        {
          displayName: 'Turistas',
          type: 'No Conformidad',
          iconName: ['person_pin'],
          route: 'backend/turista',
          material: true,
          children: [],
        },
        {
          displayName: 'Reservas',
          type: 'No Conformidad',
          iconName: ['local_offer'],
          route: 'backend/reserva',
          material: true,
          children: [],
        },
        {
          displayName: 'Tipo de No Conformidad',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/tiponc',
          material: true,
          children: [],
        },
        {
          displayName: 'Tipo de Acciones',
          type: 'No Conformidad',
          iconName: ['playlist_add_check'],
          route: 'backend/tipoac',
          material: true,
          children: [],
        },
        {
          displayName: 'Área',
          type: 'Recurso Humanos',
          iconName: ['business'],
          route: 'backend/area',
          material: true,
          children: [],
        },
      ],
    },
    {
      displayName: 'Expediente',
      type: 'Agency',
      iconName: ['create_new_folder'],
      route: 'backend/expediente',
      material: true,
      children: [],
    },
    {
      displayName: 'No Conformidad',
      type: 'No Conformidad',
      iconName: ['work'],
      route: 'backend/noconformidad',
      material: true,
      children: [],
    },
    /*{
      displayName: 'Deploys',
      type: 'Deploys',
      iconName: ['work'],
      route: 'backend/deploys',
      material: true,
      children: [],
    },*/
    //{%addInHere%}

    {
      displayName: 'Users',
      type: 'User',
      iconName: ['person'],
      route: 'backend/users',
      material: true,
      children: [],
    },

    {
      displayName: 'Usuario',
      type: 'User',
      iconName: ['person'],
      route: 'backend/usuarios',
      material: true,
      children: [],
    },

    {
      displayName: 'Logs',
      type: 'User',
      iconName: ['settings'],
      route: 'backend/logs',
      material: true,
      children: [],
    },
  ];

  constructor(private router: Router, private loggedInUserService: LoggedInUserService) {
    this.loggedInUser = loggedInUserService.getLoggedInUser();
    console.log(this.loggedInUser);
  }

  public getNavBackend() {
    if (this.loggedInUser == null) {
      this.router.navigate(['/authentication']);
    }
    if (this.loggedInUser.RolId == 8) {
      return JSON.parse(JSON.stringify(this.navECE));
    }
    if (this.loggedInUser.RolId == 5 || this.loggedInUser.RolId == 6) {
      return JSON.parse(JSON.stringify(this.navAdmin));
    }
    if (this.loggedInUser.RolId == 11) {
      return JSON.parse(JSON.stringify(this.navRRHH));
    }
    if (this.loggedInUser.RolId == 4) {
      return JSON.parse(JSON.stringify(this.navBackend));
    }
    if (this.loggedInUser.RolId == 2) {
      return JSON.parse(JSON.stringify(this.navAuditor));
    }
    if (this.loggedInUser.RolId == 9) {
      return JSON.parse(JSON.stringify(this.navSupervisor));
    }
    return JSON.parse(JSON.stringify(this.navECS));
  }
}
