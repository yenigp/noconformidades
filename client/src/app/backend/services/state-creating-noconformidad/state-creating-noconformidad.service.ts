import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateCreatingNoConformidadService {
  noconformidadCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getIncidenciaCreated();
  }

  public getIncidenciaCreated() {
    this.noconformidadCreated = JSON.parse(localStorage.getItem('noconformidadCreated'));
    this.noconformidadCreated = this.noconformidadCreated ? this.noconformidadCreated : null;
    return this.noconformidadCreated;
  }

  public setIncidenciaCreated(incidencia) {
    if (this.noconformidadCreated) {
      this.noconformidadCreated = Object.assign(this.noconformidadCreated, incidencia);
    } else {
      this.noconformidadCreated = incidencia;
    }

    localStorage.setItem('noconformidadCreated', JSON.stringify(this.noconformidadCreated));
  }
}
