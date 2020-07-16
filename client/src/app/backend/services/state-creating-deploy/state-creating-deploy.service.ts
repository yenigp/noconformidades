import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateCreatingDeployService {
  deployCreated: any = {};

  constructor(private httpClient: HttpClient) {
    this.getProductCreated();
  }

  public getProductCreated() {
    this.deployCreated = JSON.parse(localStorage.getItem('deployCreated'));
    this.deployCreated = (this.deployCreated) ? this.deployCreated : null;
    return this.deployCreated;
  }

  public setProducCreated(product) {
    if (this.deployCreated) {
      this.deployCreated = Object.assign(this.deployCreated, product);
    } else {
      this.deployCreated = product;
    }

    localStorage.setItem('deployCreated', JSON.stringify(this.deployCreated));
  }


}
