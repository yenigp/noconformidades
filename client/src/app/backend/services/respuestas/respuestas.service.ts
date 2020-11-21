import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RespuestasService {
  url = environment.apiUrl + 'respuestas';
  urlId = environment.apiUrl + 'respuestas/:respuestasId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':respuestasId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':respuestasId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':respuestasId', data + ''), this.httpOptions);
    }
  }

  createRespuestas(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editRespuestas(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':respuestasId', data.id), data, this.httpOptions);
  }

  removeRespuestas(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':respuestasId', data.id), this.httpOptions).toPromise();
  }

  getAllRespuestas(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getRespuestas(data) {
    return this.httpClient.get<any>(this.urlId.replace(':respuestasId', data.id), this.httpOptions);
  }
}
