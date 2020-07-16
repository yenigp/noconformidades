import { IPagination } from 'src/app/core/classes/pagination.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StateCreatingCompanyService {
  url = environment.apiUrl + 'category';
  urlId = environment.apiUrl + 'category/:categoryId';
  urlBrand = environment.apiUrl + 'brand';
  urlBrandId = environment.apiUrl + 'brand/:brandId';
  httpOptions = {};
  companyCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getCompanyCreated();
  }

  public getCompanyCreated() {
    this.companyCreated = JSON.parse(localStorage.getItem('companyCreated'));
    this.companyCreated = this.companyCreated ? this.companyCreated : null;
    return this.companyCreated;
  }

  public setCompanyCreated(product) {
    if (this.companyCreated) {
      this.companyCreated = Object.assign(this.companyCreated, product);
    } else {
      this.companyCreated = product;
    }

    localStorage.setItem('companyCreated', JSON.stringify(this.companyCreated));
  }
}
