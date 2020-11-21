import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AccionesService {
  url = environment.apiUrl + 'acciones';
  urlId = environment.apiUrl + 'acciones/:accionesId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':accionesId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':accionesId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':accionesId', data + ''), this.httpOptions);
    }
  }

  createAcciones(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editAcciones(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':accionesId', data.id), data, this.httpOptions);
  }

  removeAcciones(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':accionesId', data.id), this.httpOptions).toPromise();
  }

  getAllAcciones(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getAcciones(data) {
    return this.httpClient.get<any>(this.urlId.replace(':accionesId', data.id), this.httpOptions);
  }
}
