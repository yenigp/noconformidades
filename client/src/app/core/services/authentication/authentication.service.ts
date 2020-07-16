import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoggedInUserService } from '../loggedInUser/logged-in-user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../classes/user.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userUrl = environment.apiUrl + 'auth/login';
  userLogout = environment.apiUrl + 'auth/logout';
  urlSingUp = environment.apiUrl + 'auth/sign-up';
  urlSendPing = environment.apiUrl + 'auth/validate';
  urlForgot = environment.apiUrl + 'auth/forgot';
  urlChangePass = environment.apiUrl + 'auth/forgot';

  // -----------------------URL UPDATE PERSON------------------------ //
  urlProfile = environment.apiUrl + 'profile';

  constructor(private httpClient: HttpClient, private loggedInUserService: LoggedInUserService) {}

  login(user: string, password: string) {
    console.log('login service');
    const base64EncodedPw = btoa(user + ':' + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64EncodedPw,
      }),
      username: user,
      password: password,
    };
    console.log(this.userUrl);
    console.log(httpOptions);

    return this.httpClient.get<IUser>(this.userUrl, httpOptions);
  }

  logout(): Observable<any> {
    return this.httpClient.get(this.userLogout);
  }

  singUp(body): Observable<any> {
    return this.httpClient.post<any>(this.urlSingUp, body);
  }

  validatePing(body): Observable<any> {
    return this.httpClient.post<any>(this.urlSendPing, body);
  }

  passForgot(body): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('email', body.email);
    return this.httpClient.get<any>(this.urlForgot, { params: httpParams });
  }
  changePass(body): Observable<any> {
    return this.httpClient.patch<any>(this.urlChangePass, body);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  editProfile(data): Observable<any> {
    return this.httpClient.patch(this.urlProfile, data);
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  {
    provide: AuthenticationService,
    useClass: AuthenticationService,
  },
];
