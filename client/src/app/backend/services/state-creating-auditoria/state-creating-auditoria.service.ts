import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateCreatingAuditoriaService {
  auditoriaCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getAuditoriaCreated();
  }

  public getAuditoriaCreated() {
    this.auditoriaCreated = JSON.parse(localStorage.getItem('auditoriaCreated'));
    this.auditoriaCreated = this.auditoriaCreated ? this.auditoriaCreated : null;
    return this.auditoriaCreated;
  }

  public setAuditoriaCreated(auditoria) {
    if (this.auditoriaCreated) {
      this.auditoriaCreated = Object.assign(this.auditoriaCreated, auditoria);
    } else {
      this.auditoriaCreated = auditoria;
    }

    localStorage.setItem('auditoriaCreated', JSON.stringify(this.auditoriaCreated));
  }
}
