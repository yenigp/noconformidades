import { IPagination } from '../../classes/pagination.class';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ShowToastrService } from '../show-toastr/show-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  urlImage = environment.apiUrl;

  constructor(public sanitizer: DomSanitizer, private showToastr: ShowToastrService, private httpClient: HttpClient) { }

  public getUrlImages(): string {
    return environment.apiUrl;
  }

  public getSafeImage(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  errorHandle(error, nomenclator?, action?) {
    let alternative = nomenclator
      ? action
        ? 'Error ' + action + ' ' + nomenclator
        : 'Error ' + action
      : `Server response failed, check your connection to the network, or contact the administrators`;
    let msg =
      error.error && error.error.errors && error.error.errors.length
        ? error.error.errors.map((item) => item.title)
        : alternative;
    this.showToastr.showError(msg, 'Error', 9000);
  }

  errorHandle2(error, nomenclator?, action?) {
    let alternative = nomenclator
      ? action
        ? 'Error ' + action + ' ' + nomenclator
        : 'Error ' + action
      : `Server response failed, check your connection to the network, or contact the administrators`;
    let msg = alternative;
    if (error.errors && error.errors.length) {
      msg = error.errors.map((item) => item.title || item.message);
    } else if (error.error.errors) {
      msg = error.error.errors.map((item) => item.title || item.message);
    } else if (error.error && error.error.length) {
      msg = error.error.map((item) => item.title || item.message);
    } else {
      msg = error.error.message;
    }
    this.showToastr.showError(msg, 8000);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(this.urlImage, { responseType: 'blob' });
  }


}
