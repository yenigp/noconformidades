import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProcesoService {
  url = environment.apiUrl + 'proceso';
  urlId = environment.apiUrl + 'proceso/:procesoId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':procesoId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':procesoId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':procesoId', data + ''), this.httpOptions);
    }
  }

  createProceso(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editProceso(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':procesoId', data.id), data, this.httpOptions);
  }

  removeProceso(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':procesoId', data.id), this.httpOptions).toPromise();
  }

  getAllProceso(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getProceso(data) {
    return this.httpClient.get<any>(this.urlId.replace(':procesoId', data.id), this.httpOptions);
  }
}
