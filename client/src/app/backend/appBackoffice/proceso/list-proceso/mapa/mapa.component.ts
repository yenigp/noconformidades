import { Component, OnInit, Input, Inject, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcesoService } from '../../../../services/proceso/proceso.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  allProceso: any[] = [];
  ProcesoE: any[] = [];
  ProcesoR: any[] = [];
  ProcesoA: any[] = [];

  constructor(private breadcrumbService: BreadcrumbService, private procesoService: ProcesoService) {}

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Proceso', false, '/backend/proceso');
    this.breadcrumbService.setBreadcrumd('Mapa de Procesos', true);
    this.procesoService.getAllProceso().subscribe((data) => {
      this.allProceso = data.data;
      this.ProcesoE = this.allProceso.filter((item) => item.tipo == 'estratégico');
      this.ProcesoR = this.allProceso.filter((item) => item.tipo == 'realización');
      this.ProcesoA = this.allProceso.filter((item) => item.tipo == 'de apoyo');
    });
  }
}
