import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';



@Component({
  selector: 'app-admin-list-deploys',
  templateUrl: './admin-list-deploys.component.html',
  styleUrls: ['./admin-list-deploys.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminListDeploysComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;

  constructor(
    private breadcrumbService: BreadcrumbService,

  ) {

    this._unsubscribeAll = new Subject<any>();

  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Listado de proyectos desplegados', true);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
