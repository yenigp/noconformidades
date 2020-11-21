import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  url = environment.apiUrl + 'reserva';
  urlId = environment.apiUrl + 'reserva/:reservaId';

  httpOptions = {};

  constructor(private httpClient: HttpClient) {}

  get(data: any): Observable<any> {
    if (data.constructor === Object) {
      return this.httpClient.get<any>(this.urlId.replace(':reservaId', data.id), this.httpOptions);
    } else {
      return this.httpClient.get<any>(this.urlId.replace(':reservaId', data + ''), this.httpOptions);
    }
  }

  getAllReserva(query?: IPagination, params?: any) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('limit', '0');
    httpParams = httpParams.set('offset', '0');

    return this.httpClient.get<any>(this.url, { params: httpParams });
  }

  getReserva(data) {
    return this.httpClient.get<any>(this.urlId.replace(':reservaId', data.id), this.httpOptions);
  }
}
