import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class NoConformidadService {
  url = environment.apiUrl + 'noconformidad';
  urlId = environment.apiUrl + 'noconformidad/:noconformidadId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':noconformidadId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':noconformidadId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':noconformidadId', data + ''), this.httpOptions);
    }
  }

  createNoConformidad(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editNoConformidad(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':noconformidadId', data.id), data, this.httpOptions);
  }

  removeNoConformidad(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':noconformidadId', data.id), this.httpOptions).toPromise();
  }

  getAllNoConformidad(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getNoConformidad(data) {
    return this.httpClient.get<any>(this.urlId.replace(':noconformidadId', data.id), this.httpOptions);
  }
}
