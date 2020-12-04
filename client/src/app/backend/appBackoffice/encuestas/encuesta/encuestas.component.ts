import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActionsService } from 'src/app/backend/services/actions/actions.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EncuestasComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any>;
  encuestas: any[];

  constructor(private action: ActionsService, private ruta: Router, private breadcrumbService: BreadcrumbService) {
    this._unsubscribeAll = new Subject<any>();
    this.breadcrumbService.clearBreadcrumd();
  }

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumd('Sistema de Gestión de No Conformidades', true);
    this.encuestas = this.action.getEncuestas();
  }

  iniciar(id) {
    this.ruta.navigate(['backend/encuesta', id]);
  }

  ingresar() {
    this.ruta.navigate(['backend/list']);
  }

  onEditEncuesta(id): void {
    this.ruta.navigate(['/backend/encuestas/edit', id]);
  }

  onResultEncuesta(id): void {
    this.ruta.navigate(['/backend/encuestas/result', id]);
  }

  onNuevaEncuesta(): void {
    this.ruta.navigate(['/backend/encuestas/create']);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
