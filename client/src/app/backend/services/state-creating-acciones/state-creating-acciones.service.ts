import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateCreatingAccionesService {
  accionesCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getAccionesCreated();
  }

  public getAccionesCreated() {
    this.accionesCreated = JSON.parse(localStorage.getItem('accionesCreated'));
    this.accionesCreated = this.accionesCreated ? this.accionesCreated : null;
    return this.accionesCreated;
  }

  public setAccionesCreated(acciones) {
    if (this.accionesCreated) {
      this.accionesCreated = Object.assign(this.accionesCreated, acciones);
    } else {
      this.accionesCreated = acciones;
    }

    localStorage.setItem('accionesCreated', JSON.stringify(this.accionesCreated));
  }
}
