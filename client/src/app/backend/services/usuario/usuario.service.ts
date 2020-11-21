import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url = environment.apiUrl + 'usuario';
  urlId = environment.apiUrl + 'usuario/:usuarioId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':usuarioId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':usuarioId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':usuarioId', data + ''), this.httpOptions);
    }
  }

  createUsuario(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editUsuario(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':usuarioId', data.id), data, this.httpOptions);
  }

  removeUsuario(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':usuarioId', data.id), this.httpOptions).toPromise();
  }

  getAllUsuario(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getUsuario(data) {
    return this.httpClient.get<any>(this.urlId.replace(':usuarioId', data.id), this.httpOptions);
  }
}
