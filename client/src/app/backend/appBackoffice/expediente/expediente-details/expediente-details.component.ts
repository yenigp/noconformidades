import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpedienteService } from 'src/app/backend/services/expediente/expediente.service';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { BreadcrumbService } from 'src/app/backend/common-layout-components/breadcrumd/service/breadcrumb.service';
import { environment } from 'src/environments/environment';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { element } from 'protractor';
@Component({
  selector: 'app-expediente-details',
  templateUrl: './expediente-details.component.html',
  styleUrls: ['./expediente-details.component.scss'],
})
export class AdminExpedienteDetailsComponent implements OnInit {
  Expediente: any = {};
  isLoading: boolean = true;
  imageUrl: any;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private expedienteService: ExpedienteService,

    private utilsService: UtilsService,
    private showToastr: ShowToastrService,
  ) {
    this.imageUrl = environment.imageUrl;
  }

  getExpedienteInfo(expedienteId) {
    this.expedienteService.getExpediente({ id: expedienteId }).subscribe(
      (data) => {
        console.log(data);
        this.Expediente = data.data;
        this.isLoading = false;
      },
      (err) => {
        this.utilsService.errorHandle(err, 'Expediente', 'Listando');
      },
    );
  }

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Expediente', false, '/backend/expediente');
    this.breadcrumbService.setBreadcrumd('Detalles', true);

    this.route.paramMap.subscribe((paramMap) => {
      this.getExpedienteInfo(paramMap.get('expedienteId'));
    });
  }

  onAddNoConformidad() {
    this.router.navigate(['/backend/noconformidad/create'], {
      queryParams: { ExpedienteId: this.Expediente.id, redirect: window.location.pathname },
    });
  }

  onEditNoConformidad(noconformidad) {
    this.router.navigate(['/backend/noconformidad/edit'], {
      queryParams: { NoConformidadId: noconformidad.id, redirect: window.location.pathname },
    });
  }

  downloadPDF(): void {
    const DATA = document.getElementById('product-card');
    const doc = new jsPDF('p', 'pt', 'letter');
    const options = {
      imageTimeout: 50000,
      allowTaint: true,
      useCORS: false,
      background: 'white',
      scale: 3,
    };

    /*html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Añadir imagen Canvas a PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.text(50, 50, 'Hello world!');
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_noconformidad.pdf`);
      });*/
  }
}
