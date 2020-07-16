import { IPagination } from './../../../core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl + 'person';
  urlId = environment.apiUrl + 'person/:personId';
  urlMessenger = environment.apiUrl + 'messenger';
  urlMessengerId = environment.apiUrl + 'messenger/:Id';
  httpOptions = {};

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {};
  }

  createUser(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editUser(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':personId', data.id), data, this.httpOptions);
  }

  removeUser(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':personId', data.id), this.httpOptions).toPromise();
  }

  getAllUsers(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getUser(data) {
    if (typeof data === 'number') {
      return this.httpClient.get<any>(this.urlId.replace(':personId', data.toFixed()), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':personId', data.id), this.httpOptions);
    }
  }

}
