import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EncuestasService {
  url = environment.apiUrl + 'encuestas';
  urlId = environment.apiUrl + 'encuestas/:encuestasId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':encuestasId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':encuestasId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':encuestasId', data + ''), this.httpOptions);
    }
  }

  createEncuestas(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editEncuestas(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':encuestasId', data.id), data, this.httpOptions);
  }

  removeEncuestas(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':encuestasId', data.id), this.httpOptions).toPromise();
  }

  getAllEncuestas(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getEncuestas(data) {
    return this.httpClient.get<any>(this.urlId.replace(':encuestasId', data.id), this.httpOptions);
  }
}
