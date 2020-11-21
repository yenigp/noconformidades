import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class AreaService {
  url = environment.apiUrl + 'area';
  urlId = environment.apiUrl + 'area/:areaId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':areaId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':areaId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':areaId', data + ''), this.httpOptions);
    }
  }

  createArea(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editArea(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':areaId', data.id), data, this.httpOptions);
  }

  removeArea(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':areaId', data.id), this.httpOptions).toPromise();
  }

  getAllArea(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getArea(data) {
    return this.httpClient.get<any>(this.urlId.replace(':areaId', data.id), this.httpOptions);
  }
}
