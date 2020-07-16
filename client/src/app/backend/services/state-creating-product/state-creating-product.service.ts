import { IPagination } from 'src/app/core/classes/pagination.class'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateCreatingprojectService {
  url = environment.apiUrl + 'category';
  urlId = environment.apiUrl + 'category/:categoryId';
  urlBrand = environment.apiUrl + 'brand';
  urlBrandId = environment.apiUrl + 'brand/:brandId';
  httpOptions = {};
  productCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getProductCreated();
  }

  public getProductCreated() {
    this.productCreated = JSON.parse(localStorage.getItem('productCreated'));
    this.productCreated = (this.productCreated) ? this.productCreated : null;
    return this.productCreated;
  }

  public setProducCreated(product) {
    if (this.productCreated) {
      this.productCreated = Object.assign(this.productCreated, product);
    } else {
      this.productCreated = product;
    }

    localStorage.setItem('productCreated', JSON.stringify(this.productCreated));
  }


}
