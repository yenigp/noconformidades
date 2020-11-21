import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TuristaService {
  url = environment.apiUrl + 'turista';
  urlId = environment.apiUrl + 'turista/:turistaId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':turistaId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':turistaId', data + ''), this.httpOptions);
    }
  }

  getAllTurista(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', '20');
    httpParams = httpParams.set('offset', '0');

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getTurista(data) {
    return this.httpClient.get<any>(this.urlId.replace(':turistaId', data.id), this.httpOptions);
  }
}
