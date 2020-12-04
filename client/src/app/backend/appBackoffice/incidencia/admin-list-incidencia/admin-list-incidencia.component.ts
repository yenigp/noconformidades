import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';

@Component({
  selector: 'app-admin-list-incidencia',
  templateUrl: './admin-list-incidencia.component.html',
  styleUrls: ['./admin-list-incidencia.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminListIncidenciaComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Listado de incidencias', true);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
