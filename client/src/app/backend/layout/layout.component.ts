import { Component, ViewChild, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { NavigationService } from 'src/app/backend/navigation';
import { PanelNotificationsComponent } from '../common-layout-components/panel-notifications/panel-notifications.component';
import { StateCreatingprojectService } from '../services/state-creating-product/state-creating-product.service';
import { SpinnerLoadingService } from '../services/spinner-loading/spinner-loading.service';
import { AdminEditProfileComponent } from '../common-dialogs-module/admin-edit-profile/admin-edit-profile.component';
import { Permisos } from 'src/app/core/classes/permisos';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  applyStyle = false;
  innerWidth: any;
  previousUrl = '';
  currentUrl = '';
  loggedInUser: any;
  userUrl = environment.apiUrl;
  separator = '/';
  isHandset = false;
  navBarQuerySubscription: Subscription;
  navRouterSubscription: Subscription;
  userUpdatedSubscription: Subscription;
  routeChangeSubscrition: Subscription;
  isSmallDevice: boolean;
  valueSpiner = 50;
  bufferValue = 75;

  @ViewChild('drawer', { static: true })
  public sidenav: MatSidenav;
  navigationData: any[] = [];
  year: any = null;
  all_navigation_data: any[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    public stateCreatingprojectService: StateCreatingprojectService,
    private router: Router,
    public dialog: MatDialog,
    private navigationService: NavigationService,
    public authService: AuthenticationService,
    public spinnerLoading: SpinnerLoadingService,
    private loggedInUserService: LoggedInUserService,
    private showToastr: ShowToastrService,
  ) {
    this.loggedInUser = loggedInUserService.getLoggedInUser();
    this.loggedInUser = loggedInUserService.getLoggedInUser();
    this.all_navigation_data = this.navigationService.getNavBackend();


    this.navigationData = this.all_navigation_data;

    this.navBarQuerySubscription = this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Handset, Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Tablet])
      .subscribe((data) => {
        this.isHandset = data.matches;
        this.isSmallDevice = data.matches;
      });

    this.navRouterSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        if (this.isHandset && this.sidenav && this.sidenav.opened) {
          const TimeCloseSid = setTimeout(() => {
            this.sidenav.close();
            clearTimeout(TimeCloseSid);
          }, 250);
        }
      }
    });

    this.year = new Date().getFullYear();
  }

  logout(): void {
    this.removeCookies();
    localStorage.removeItem('user');
    this.loggedInUserService.setLoggedInUser(null);
    localStorage.clear();
    this.router.navigate(['authentication']);
  }

  removeCookies() {
    const res = document.cookie;
    const multiple = res.split(';');
    for (let i = 0; i < multiple.length; i++) {
      const key = multiple[i].split('=');
      document.cookie = key[0] + ' =; expires = Thu, 01 Jan 1970 00:00:00 UTC';
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 600) {
      this.applyStyle = false;
    } else {
      this.applyStyle = true;
    }

    this.userUpdatedSubscription = this.loggedInUserService.$loggedInUserUpdated.subscribe(() => {
      this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    });

  }

  ngOnDestroy(): void {
    if (this.navBarQuerySubscription) {
      this.navBarQuerySubscription.unsubscribe();
    }
    if (this.navRouterSubscription) {
      this.navRouterSubscription.unsubscribe();
    }
    if (this.routeChangeSubscrition) {
      this.routeChangeSubscrition.unsubscribe();
    }
    if (this.userUpdatedSubscription) {
      this.userUpdatedSubscription.unsubscribe();
    }
  }

  /////////////// View Notifications //////////////////
  onViewNotifications(): void {
    let dialogRef: MatDialogRef<PanelNotificationsComponent, any>;
    dialogRef = this.dialog.open(PanelNotificationsComponent, {
      panelClass: 'app-panel-notifications',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.onRefreshData();
      }
    });
  }

  /////// Edit Profile /////
  onEditProfile(): void {
    let dialogRef: MatDialogRef<AdminEditProfileComponent, any>;
    dialogRef = this.dialog.open(AdminEditProfileComponent, {
      panelClass: 'app-admin-edit-profile',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/authentication']);
      this.showToastr.showInfo('Usuario deslogeado exitósamente', 'Ok');
    },
      (error) => {
        localStorage.removeItem('user');
        this.router.navigate(['/authentication']);
        this.showToastr.showInfo('Usuario deslogeado exitósamente', 'Ok');
      })
  }

}
