import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TipoNCService {
  url = environment.apiUrl + 'tiponc';
  urlId = environment.apiUrl + 'tiponc/:tiponcId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':tiponcId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':tiponcId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':tiponcId', data + ''), this.httpOptions);
    }
  }

  createTipoNC(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editTipoNC(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':tiponcId', data.id), data, this.httpOptions);
  }

  removeTipoNC(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':tiponcId', data.id), this.httpOptions).toPromise();
  }

  getAllTipoNC(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getTipoNC(data) {
    return this.httpClient.get<any>(this.urlId.replace(':tiponcId', data.id), this.httpOptions);
  }
}
