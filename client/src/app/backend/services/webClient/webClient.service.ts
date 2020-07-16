import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WebClientService {
  url = environment.apiUrl + 'web-client';
  urlId = environment.apiUrl + 'web-client/:id';

  httpOptions = {};

  constructor(private httpClient: HttpClient) { }

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':id', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':id', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':id', data + ''), this.httpOptions);
    }
  }




  createWebClient(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editWebClient(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':id', data.id), data, this.httpOptions);
  }

  removeWebClient(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':id', data.id), this.httpOptions).toPromise();
  }

  getAllWebClients(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getWebClient(data) {
    return this.httpClient.get<any>(this.urlId.replace(':id', data.id), this.httpOptions);
  }
}
