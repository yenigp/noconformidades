import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class DictamenService {
  url = environment.apiUrl + 'dictamen';
  urlId = environment.apiUrl + 'dictamen/:dictamenId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':dictamenId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':dictamenId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':dictamenId', data + ''), this.httpOptions);
    }
  }

  createDictamen(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editDictamen(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':dictamenId', data.id), data, this.httpOptions);
  }

  removeDictamen(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':dictamenId', data.id), this.httpOptions).toPromise();
  }

  getAllDictamen(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getDictamen(data) {
    return this.httpClient.get<any>(this.urlId.replace(':dictamenId', data.id), this.httpOptions);
  }
}
