import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  url = environment.apiUrl + 'auditoria';
  urlId = environment.apiUrl + 'auditoria/:auditoriaId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':auditoriaId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':auditoriaId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':auditoriaId', data + ''), this.httpOptions);
    }
  }

  createAuditoria(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editAuditoria(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':auditoriaId', data.id), data, this.httpOptions);
  }

  removeAuditoria(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':auditoriaId', data.id), this.httpOptions).toPromise();
  }

  getAllAuditoria(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getAuditoria(data) {
    return this.httpClient.get<any>(this.urlId.replace(':auditoriaId', data.id), this.httpOptions);
  }
}
