import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedInUserService } from '../loggedInUser/logged-in-user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  token: any = null;

  constructor(private loggedInUserService: LoggedInUserService) {
    this.token = loggedInUserService.getTokenOfUser();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.loggedInUserService.getTokenOfUser();
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: this.token,
        },
      });
    }
    return next.handle(request);
  }
}
