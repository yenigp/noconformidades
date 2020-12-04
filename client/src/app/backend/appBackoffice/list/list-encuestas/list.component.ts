import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActionsService } from 'src/app/backend/services/actions/actions.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;
  encuestas: any[];

  constructor(private action: ActionsService, private ruta: Router, private breadcrumbService: BreadcrumbService) {
    this._unsubscribeAll = new Subject<any>();
    this.breadcrumbService.clearBreadcrumd();
  }

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Encuestas', false, '/backend/encuestas');
    this.breadcrumbService.setBreadcrumd('Listado de Encuestas', true);
    this.encuestas = this.action.getEncuestas();
  }

  edit(id) {
    this.ruta.navigate(['/backend/encuestas/edit', id]);
  }

  result(id) {
    this.ruta.navigate(['/backend/encuestas/result', id]);
  }

  deleted(id) {
    this.action.deleted(id);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
