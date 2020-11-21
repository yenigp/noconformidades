import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class NormaService {
  url = environment.apiUrl + 'norma';
  urlId = environment.apiUrl + 'norma/:normaId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':normaId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':normaId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':normaId', data + ''), this.httpOptions);
    }
  }

  createNorma(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editNorma(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':normaId', data.id), data, this.httpOptions);
  }

  removeNorma(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':normaId', data.id), this.httpOptions).toPromise();
  }

  getAllNorma(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getNorma(data) {
    return this.httpClient.get<any>(this.urlId.replace(':normaId', data.id), this.httpOptions);
  }
}
