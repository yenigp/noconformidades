import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateCreatingIncidenciaService {
  incidenciaCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getIncidenciaCreated();
  }

  public getIncidenciaCreated() {
    this.incidenciaCreated = JSON.parse(localStorage.getItem('incidenciaCreated'));
    this.incidenciaCreated = this.incidenciaCreated ? this.incidenciaCreated : null;
    return this.incidenciaCreated;
  }

  public setIncidenciaCreated(incidencia) {
    if (this.incidenciaCreated) {
      this.incidenciaCreated = Object.assign(this.incidenciaCreated, incidencia);
    } else {
      this.incidenciaCreated = incidencia;
    }

    localStorage.setItem('incidenciaCreated', JSON.stringify(this.incidenciaCreated));
  }
}
