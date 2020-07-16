import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerLoadingService {

  active = false;
  constructor() { }

  public start() {
    this.active = true;
  }

  public stop() {
    this.active = false;
  }

  public running(): boolean {
    return this.active;
  }


}
