import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class IndicadoresService {
  url = environment.apiUrl + 'indicadores';
  urlId = environment.apiUrl + 'indicadores/:indicadoresId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':indicadoresId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':indicadoresId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':indicadoresId', data + ''), this.httpOptions);
    }
  }

  createIndicadores(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editIndicadores(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':indicadoresId', data.id), data, this.httpOptions);
  }

  removeIndicadores(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':indicadoresId', data.id), this.httpOptions).toPromise();
  }

  getAllIndicadores(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getIndicadores(data) {
    return this.httpClient.get<any>(this.urlId.replace(':indicadoresId', data.id), this.httpOptions);
  }
}
