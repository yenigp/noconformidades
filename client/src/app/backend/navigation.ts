import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  navBackend: any[] = [
    {
      displayName: 'Empresas',
      type: 'Agency',
      iconName: ['business'],
      route: 'backend/empresas',
      material: true,
      children: [],
    },
    {
      displayName: 'Proyectos',
      type: 'Proyectos',
      iconName: ['work'],
      route: 'backend/projects',
      material: true,
      children: [],
    },
    {
      displayName: 'Deploys',
      type: 'Deploys',
      iconName: ['work'],
      route: 'backend/deploys',
      material: true,
      children: [],
    },
    //{%addInHere%}


    {
      displayName: 'Logs',
      type: 'User',
      iconName: ['settings'],
      route: 'backend/logs',
      material: true,
      children: [],
    },
  ];

  constructor() { }

  public getNavBackend() {
    return JSON.parse(JSON.stringify(this.navBackend));
  }
}
