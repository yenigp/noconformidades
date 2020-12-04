import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  url = environment.apiUrl + 'categorias';
  urlId = environment.apiUrl + 'categorias/:categoriasId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  remove(data) {
    return this.httpClient.delete<any>(this.urlId.replace(':categoriasId', data.id), this.httpOptions);
  }

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':categoriasId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':categoriasId', data + ''), this.httpOptions);
    }
  }

  createCategorias(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url, body);
  }

  editCategorias(data) {
    return this.httpClient.patch<any>(this.urlId.replace(':categoriasId', data.id), data, this.httpOptions);
  }

  removeCategorias(data): Promise<any> {
    return this.httpClient.delete<any>(this.urlId.replace(':categoriasId', data.id), this.httpOptions).toPromise();
  }

  getAllCategorias(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getCategorias(data) {
    return this.httpClient.get<any>(this.urlId.replace(':categoriasId', data.id), this.httpOptions);
  }
}
