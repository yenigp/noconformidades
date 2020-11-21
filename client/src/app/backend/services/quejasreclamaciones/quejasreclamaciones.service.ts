import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class QuejasReclamacionesService {
  url = environment.apiUrl + 'quejasreclamaciones';
  urlId = environment.apiUrl + 'quejasreclamaciones/:quejasreclamacionesId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':quejasreclamacionesId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':quejasreclamacionesId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':quejasreclamacionesId', data + ''), this.httpOptions);
    }
  }

  createQuejasReclamaciones(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editQuejasReclamaciones(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':quejasreclamacionesId', data.id), data, this.httpOptions);
  }

  removeQUejasReclamaciones(data): Promise<any> {
    return this.httpClient
      .delete<any>(this.urlId.replace(':quejasreclamacionesId', data.id), this.httpOptions)
      .toPromise();
  }

  getAllQuejasReclamaciones(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getQuejasReclamaciones(data) {
    return this.httpClient.get<any>(this.urlId.replace(':quejasreclamacionesId', data.id), this.httpOptions);
  }
}
