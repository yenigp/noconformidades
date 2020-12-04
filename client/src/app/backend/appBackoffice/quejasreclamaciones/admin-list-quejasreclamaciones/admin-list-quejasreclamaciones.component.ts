import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';

@Component({
  selector: 'app-admin-list-quejasreclamaciones',
  templateUrl: './admin-list-quejasreclamaciones.component.html',
  styleUrls: ['./admin-list-quejasreclamaciones.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminListQuejasReclamacionesComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Sistema de Gestión de No Conformidades', true);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
