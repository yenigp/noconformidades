import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RolesService {
  url = environment.apiUrl + 'roles';
  urlId = environment.apiUrl + 'roles/:rolesId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':rolesId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':rolesId', data + ''), this.httpOptions);
    }
  }

  getAllRoles(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getRoles(data) {
    return this.httpClient.get<any>(this.urlId.replace(':rolesId', data.id), this.httpOptions);
  }
}
