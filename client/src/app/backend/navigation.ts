import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
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

  constructor() {}

  public getNavBackend() {
    return JSON.parse(JSON.stringify(this.navBackend));
  }
}
