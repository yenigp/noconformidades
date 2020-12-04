import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  url = environment.apiUrl + 'incidencia';
  urlId = environment.apiUrl + 'incidencia/:incidenciaId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':incidenciaId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':incidenciaId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':incidenciaId', data + ''), this.httpOptions);
    }
  }

  createIncidencia(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editIncidencia(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':incidenciaId', data.id), data, this.httpOptions);
  }

  removeIncidencia(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':incidenciaId', data.id), this.httpOptions).toPromise();
  }

  getAllIncidencia(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getIncidencia(data) {
    return this.httpClient.get<any>(this.urlId.replace(':incidenciaId', data.id), this.httpOptions);
  }
}
