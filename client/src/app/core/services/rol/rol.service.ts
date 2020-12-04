import { IPagination } from '../../classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  url = environment.apiUrl + 'roles';
  urlId = environment.apiUrl + 'roles/:rolesId';
  httpOptions = {};

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {};
  }

  getAllRoles(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getRol(data) {
    if (typeof data === 'number') {
      return this.httpClient.get<any>(this.urlId.replace(':rolesId', data.toFixed()), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':rolesId', data.id), this.httpOptions);
    }
  }
}
