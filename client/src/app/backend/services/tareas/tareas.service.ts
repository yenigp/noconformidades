import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TareasService {
  url = environment.apiUrl + 'tareas';
  urlId = environment.apiUrl + 'tareas/:tareasId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':tareasId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':tareasId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':tareasId', data + ''), this.httpOptions);
    }
  }

  createTareas(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editTareas(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':tareasId', data.id), data, this.httpOptions);
  }

  removeTareas(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':tareasId', data.id), this.httpOptions).toPromise();
  }

  getAllTareas(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getTareas(data) {
    return this.httpClient.get<any>(this.urlId.replace(':tareasId', data.id), this.httpOptions);
  }
}
