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
export class BackendFeaturesGuard implements CanActivate, CanLoad {
  constructor(private loggedInUserService: LoggedInUserService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (
      this.loggedInUserService.getLoggedInUser()
    ) {

      return true;
    } else {
      this.router.navigate(['/error/acceso-prohibido']);
      return false;
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loggedInUserService.getLoggedInUser()) {
      return true;
    } else {
      this.router.navigate(['/error/acceso-prohibido']);
      return false;
    }
  }
}
