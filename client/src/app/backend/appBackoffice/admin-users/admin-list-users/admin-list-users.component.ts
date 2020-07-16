import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';



@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminListUsersComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;

  constructor(
    private breadcrumbService: BreadcrumbService,

  ) {

    this._unsubscribeAll = new Subject<any>();

  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Usuarios del sistema', true);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
