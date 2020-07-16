import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  UrlSegment,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class BackendGuard implements CanActivate, CanLoad {
  constructor(private loggedInUserService: LoggedInUserService, private route: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (
      this.loggedInUserService.getLoggedInUser()
    ) {
      return true;
    } else {
      this.route.navigate(['/error/acceso-prohibido']);
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loggedInUserService.getLoggedInUser()) {
      return true;
    } else {
      this.route.navigate(['/error/acceso-prohibido']);
      return false;
    }
  }
}
