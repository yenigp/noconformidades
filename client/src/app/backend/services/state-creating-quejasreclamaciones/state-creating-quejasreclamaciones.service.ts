import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateCreatingQuejasReclamacionesService {
  quejasreclamacionesCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getQuejasReclamacionesCreated();
  }

  public getQuejasReclamacionesCreated() {
    this.quejasreclamacionesCreated = JSON.parse(localStorage.getItem('quejasreclamacionesCreated'));
    this.quejasreclamacionesCreated = this.quejasreclamacionesCreated ? this.quejasreclamacionesCreated : null;
    return this.quejasreclamacionesCreated;
  }

  public setQuejasReclamacionesCreated(quejareclamacion) {
    if (this.quejasreclamacionesCreated) {
      this.quejasreclamacionesCreated = Object.assign(this.quejasreclamacionesCreated, quejareclamacion);
    } else {
      this.quejasreclamacionesCreated = quejareclamacion;
    }

    localStorage.setItem('quejasreclamacionesCreated', JSON.stringify(this.quejasreclamacionesCreated));
  }
}
