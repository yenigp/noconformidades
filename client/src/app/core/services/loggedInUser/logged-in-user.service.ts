import { Injectable } from '@angular/core';
import { IUser } from '../../classes/user.class';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserService {
  $loggedInUserUpdated = new Subject<any>();
  loggedInUser: IUser = null;

  constructor() {
    const data = localStorage.getItem('user');
    if (data) {
      this.loggedInUser = JSON.parse(data);
    }
  }

  public setNewProfile(profile) {
    let dataValue = JSON.parse(localStorage.getItem('user'));
    dataValue.profile = Object.assign(dataValue.profile, profile);
    localStorage.setItem('user', JSON.stringify(dataValue));
    this.loggedInUser = dataValue;
    this.$loggedInUserUpdated.next(this.loggedInUser);
  }

  public getLoggedInUser(): any {
    let data = JSON.parse(localStorage.getItem('user'));
    data = data ? data.profile : null;

    return data;
  }
  public getTokenOfUser(): any {
    let data = JSON.parse(localStorage.getItem('user'));
    data = data ? data.Authorization : null;
    return data;
  }

  public setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }

  public updateUserProfile(user) {
    let dataString: string;
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    const tempdata = this.loggedInUser ? this.loggedInUser : {};
    if (user) {
      this.loggedInUser = Object.assign(tempdata, user);
    } else {
      this.loggedInUser = null;
    }
    dataString = JSON.stringify(this.loggedInUser);
    localStorage.setItem('user', dataString);
    this.$loggedInUserUpdated.next(this.loggedInUser);
  }

}
