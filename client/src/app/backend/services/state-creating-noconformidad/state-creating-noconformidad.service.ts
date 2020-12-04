import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateCreatingNoConformidadService {
  noconformidadCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getNoConformidadCreated();
  }

  public getNoConformidadCreated() {
    this.noconformidadCreated = JSON.parse(localStorage.getItem('noconformidadCreated'));
    this.noconformidadCreated = this.noconformidadCreated ? this.noconformidadCreated : null;
    return this.noconformidadCreated;
  }

  public setNoConformidadCreated(noconformidad) {
    if (this.noconformidadCreated) {
      this.noconformidadCreated = Object.assign(this.noconformidadCreated, noconformidad);
    } else {
      this.noconformidadCreated = noconformidad;
    }

    localStorage.setItem('noconformidadCreated', JSON.stringify(this.noconformidadCreated));
  }
}
