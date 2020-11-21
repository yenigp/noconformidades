import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TipoACService {
  url = environment.apiUrl + 'tipoac';
  urlId = environment.apiUrl + 'tipoac/:tipoacId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':tipoacId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':tipoacId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':tipoacId', data + ''), this.httpOptions);
    }
  }

  createTipoAC(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editTipoAC(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':tipoacId', data.id), data, this.httpOptions);
  }

  removeTipoAC(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':tipoacId', data.id), this.httpOptions).toPromise();
  }

  getAllTipoAC(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getTipoAC(data) {
    return this.httpClient.get<any>(this.urlId.replace(':tipoacId', data.id), this.httpOptions);
  }
}
