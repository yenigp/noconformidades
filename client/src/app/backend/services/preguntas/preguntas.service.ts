import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PreguntasService {
  url = environment.apiUrl + 'preguntas';
  urlId = environment.apiUrl + 'preguntas/:preguntasId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':preguntasId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':preguntasId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':preguntasId', data + ''), this.httpOptions);
    }
  }

  createPreguntas(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editPreguntas(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':preguntasId', data.id), data, this.httpOptions);
  }

  removePreguntas(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':preguntasId', data.id), this.httpOptions).toPromise();
  }

  getAllPreguntas(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getPreguntas(data) {
    return this.httpClient.get<any>(this.urlId.replace(':preguntasId', data.id), this.httpOptions);
  }
}
