import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { BreadcrumbService } from '../../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { AccionesService } from 'src/app/backend/services/acciones/acciones.service';
import { ProcesoService } from 'src/app/backend/services/proceso/proceso.service';
import { NormaService } from 'src/app/backend/services/norma/norma.service';
import { UserService } from 'src/app/backend/services/user/user.service';
import { AreaService } from 'src/app/backend/services/area/area.service';

import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { IUser } from 'src/app/core/classes/user.class';

import { from, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuditoriaService } from '../../../../services/auditoria/auditoria.service';
import { StateCreatingAuditoriaService } from '../../../../services/state-creating-auditoria/state-creating-auditoria.service';
import { IPagination } from 'src/app/core/classes/pagination.class';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-create-auditoria',
  templateUrl: './auditoria-create.component.html',
  styleUrls: ['./auditoria-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateAuditoriaComponent implements OnInit, OnDestroy {
  Norma: any[] = [];
  Proceso: any[] = [];
  jefeproceso: any;
  JefeProceso: any[] = [];
  EspCalidad: any[] = [];
  allSucursal: any[] = [];
  Usuario: any[] = [];
  Area: any[] = [];
  stepIndex = 0;
  stepPass = 0;
  loggedInUser: IUser = null;
  auditoriaCreated: any = null;
  _unsubscribeAll: Subject<any>;
  recomendedAuditoria: any[] = [];
  recomendedAuditoriaOutput: any[] = [];
  isSaving = false;
  isEditing = false;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  auditoria: any;
  Acciones: any[] = [];
  Resultado: any[] = ['procede', 'no procede'];
  Gravedad: any[] = ['crítica', 'mayor'];
  tipoqr: any[] = ['queja', 'reclamación'];
  clasificacion: any[] = ['interna', 'externa'];
  rellenarAcciones: boolean = false;
  aCasoAlgoCambioEnAuditoria: boolean = false;
  queryParams: any = {};
  alreadyLoaded: boolean = false;
  maxDate: Date;
  minDate: Date;
  minDateProcedencia: Date;
  hide = true;
  myFilter = function (d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  // selectedAuditoria: number = 2;
  ////////////////////Pagination Structure/////////////////////
  query: IPagination = {
    limit: 0,
    total: 0,
    offset: 0,
    order: '-updatedAt',
    page: 1,
    filter: { filterText: '', properties: [] },
  };
  action: string = 'Siguiente';

  @ViewChild('stepper', { static: false }) stepper: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private accionesService: AccionesService,
    private normaService: NormaService,
    private procesoService: ProcesoService,
    private userService: UserService,
    private areaService: AreaService,
    private loggedInUserService: LoggedInUserService,
    private showToastr: ShowToastrService,
    private auditoriaService: AuditoriaService,
    private stateAuditoria: StateCreatingAuditoriaService,
    private router: Router,
    private route: ActivatedRoute,

    private fb: FormBuilder,
  ) {
    this.auditoria = {};
    this._unsubscribeAll = new Subject<any>();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
    });
    this.getAuditoria();
    this.minDateProcedencia = new Date(new Date().setDate(new Date().getDate() - 7));
    this.minDate = new Date(new Date().setDate(new Date().getDate() - 10));
    this.maxDate = new Date();
    this.jefeproceso = {};
  }

  //---------------Evidencia---------

  showErrorImage = false;
  urlImage = 'url(data:image/jpeg;base64,';
  base64textString = null;
  imageBrand = null;
  loadImage = false;
  imageBrandChange = false;
  openFileBrowser(event) {
    event.preventDefault();

    const element: HTMLElement = document.getElementById('filePicker') as HTMLElement;
    element.click();
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    if (files[0].size < 500000) {
      if (files && file) {
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    } else {
      this.showErrorImage = true;
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.urlImage = 'data:image/jpeg;base64,';
    this.imageBrand = this.urlImage + this.base64textString;
    this.loadImage = true;
    this.showErrorImage = false;
    this.imageBrandChange = true;
  }

  //////////////////////////////////////////

  /////////////////////////////////////////

  getAuditoria() {
    if (this.queryParams.AuditoriaId) {
      this.auditoriaService.getAuditoria({ id: this.queryParams.AuditoriaId }).subscribe(
        (data) => {
          this.auditoriaCreated = data.data;
          this.generarReport();
        },
        (err) => {
          this.utilsService.errorHandle(err, 'Auditorías', 'Listando');
        },
      );
    } else {
      this.generarReport();
    }
  }

  generarReport() {
    if (this.auditoriaCreated) {
      this.rellenarResumen(this.auditoriaCreated);
      this.rellenarAcciones = true;
    } else {
      this.rellenarAcciones = true;
    }
    this.buildForm();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Auditoría', false, '/backend/auditoria');
    if (this.loggedInUser.RolId == 2) {
      this.breadcrumbService.setBreadcrumd('Registrar auditoría', true);
    }
    if (this.loggedInUser.RolId == 7) {
      this.breadcrumbService.setBreadcrumd('Procesar auditoría', true);
    }
    if (this.loggedInUser.RolId == 3) {
      this.breadcrumbService.setBreadcrumd('Analizar auditoría', true);
    }
    this.normaService.getAllNorma().subscribe((data) => {
      this.Norma = data.data;
    });
    this.procesoService.getAllProceso().subscribe((data) => {
      this.Proceso = data.data;
    });
    this.areaService.getAllArea().subscribe((data) => {
      this.Area = data.data;
    });
    this.userService.getAllUsers().subscribe((data) => {
      this.Usuario = data.data;
      this.JefeProceso = this.Usuario.filter((item) => item.Role.nombre === 'JefeProceso');
      this.EspCalidad = this.Usuario.filter((item) => item.Role.nombre === 'EspCalidadSucursal');
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  prepareAuditoriaResumen() {
    this.form.valueChanges.subscribe((val) => {
      this.rellenarResumen(val);
    });
  }

  rellenarResumen(val) {
    this.auditoria.codigo = val.NoConformidad.codigo ? val.NoConformidad.codigo : '';
    this.auditoria.FechaRegistro = val.NoConformidad.FechaRegistro ? val.NoConformidad.FechaRegistro : '';
    this.auditoria.FechaIdentificacion = val.NoConformidad.FechaIdentificacion
      ? val.NoConformidad.FechaIdentificacion
      : '';
    this.auditoria.FechaTermino = val.NoConformidad.FechaTermino ? val.NoConformidad.FechaTermino : '';
    this.auditoria.FechaCierre = val.NoConformidad.FechaCierre ? val.NoConformidad.FechaCierre : '';
    this.auditoria.ProcesoId = val.NoConformidad.Proceso.nombre ? val.NoConformidad.Proceso.nombre : '';
    this.auditoria.NormaId = val.NoConformidad.NormaId ? val.NoConformidad.Norma.nombre : '';
    this.auditoria.procedencia = val.procedencia ? val.procedencia : '';
  }

  buildForm(): void {
    this.form = this.fb.group({
      ProcesoId: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.ProcesoId
          ? this.auditoriaCreated.NoConformidad.ProcesoId
          : null,
      ],
      NormaId: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.NormaId
          ? this.auditoriaCreated.NoConformidad.NormaId
          : null,
      ],
      FechaIdentificacion: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.FechaIdentificacion
          ? this.auditoriaCreated.NoConformidad.FechaIdentificacion
          : null,
      ],
      FechaRevision: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.FechaRevision
          ? this.auditoriaCreated.NoConformidad.FechaRevision
          : null,
      ],
      descripcion: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.descripcion
          ? this.auditoriaCreated.NoConformidad.descripcion
          : null,
      ],
      resultado: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.resultado
          ? this.auditoriaCreated.NoConformidad.resultado
          : null,
      ],
      gravedad: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.gravedad
          ? this.auditoriaCreated.NoConformidad.gravedad
          : null,
      ],
      EspCalidad: [this.auditoriaCreated && this.auditoriaCreated.EspCalidad ? this.auditoriaCreated.EspCalidad : null],
      JefeProceso: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.JefeProceso
          ? this.auditoriaCreated.NoConformidad.JefeProceso
          : null,
      ],
      AreaId: [
        this.auditoriaCreated && this.auditoriaCreated.NoConformidad.AreaId
          ? this.auditoriaCreated.NoConformidad.AreaId
          : null,
      ],
      procedencia: [
        this.auditoriaCreated && this.auditoriaCreated.procedencia ? this.auditoriaCreated.procedencia : null,
      ],
      observacion: [
        this.auditoriaCreated && this.auditoriaCreated.observacion ? this.auditoriaCreated.observacion : null,
      ],
    });
    this.prepareAuditoriaResumen();
    this.form.valueChanges.subscribe((val) => {
      this.aCasoAlgoCambioEnAuditoria = true;
      this.action = 'Guardar';
    });
    this.alreadyLoaded = true;
  }

  onSaveBasicAuditoria(): void {
    this.spinner.show();
    let data = this.form.value;
    if (this.imageBrandChange) {
      data.evidencia = this.imageBrand;
    }
    this.spinner.show();
    if (this.auditoriaCreated) {
      if (this.aCasoAlgoCambioEnAuditoria) {
        data.id = this.auditoriaCreated.id;
        this.auditoriaService.editAuditoria(data).subscribe(
          (data) => {
            this.showToastr.showSucces('Auditoría actualizada exitosamente', 'Aviso');
            this.auditoriaCreated = data.data;
            if (this.loggedInUser.RolId == 2 || this.loggedInUser.RolId == 7) {
              this.finalNavigation();
            } else {
              this.stepIndex += 1;
              this.spinner.hide();
            }
          },
          (error) => {
            this.utilsService.errorHandle(error);
            this.spinner.hide();
          },
        );
      } else {
        this.stepIndex += 1;
        this.spinner.hide();
      }
    } else {
      this.auditoriaService.createAuditoria(data).subscribe(
        (data) => {
          this.showToastr.showSucces('Auditoría creada exitosamente', 'Aviso');
          this.auditoriaCreated = data.data;
          if (this.loggedInUser.RolId == 2) {
            this.finalNavigation();
          } else {
            this.stepIndex += 1;
            this.spinner.hide();
          }
        },
        (error) => {
          this.utilsService.errorHandle(error);
          this.spinner.hide();
        },
      );
    }
  }

  onSlectionChange(event): void {
    this.stepIndex = event.selectedIndex;
  }

  ProcesarAcciones($event) {
    this.aCasoAlgoCambioEnAuditoria = true;
    this.Acciones = $event;
  }

  onClearStorage(): void {
    localStorage.removeItem('auditoriaCreated');
    this.auditoriaCreated = null;
    this.form.reset();
  }

  //////////////////////////////////////////////////////////////////////////
  Finalizar() {
    let data = {
      id: this.queryParams.AuditoriaId,
      Acciones: this.Acciones,
    };
    this.spinner.show();
    if (this.auditoriaCreated) {
      if (this.aCasoAlgoCambioEnAuditoria) {
        this.auditoriaService.editAuditoria(data).subscribe(
          (data) => {
            console.log(data);
            this.showToastr.showSucces('Auditoría actualizada exitosamente', 'Aviso');
            this.finalNavigation();
          },
          (error) => {
            this.utilsService.errorHandle(error);
            this.spinner.hide();
          },
        );
      } else {
        this.finalNavigation();
      }
    }
  }

  finalNavigation() {
    this.onClearStorage();
    this.spinner.hide();
    if (this.queryParams.redirect) {
      this.router.navigate([this.queryParams.redirect]);
    } else {
      this.router.navigate(['/backend/auditoria']);
    }
  }
  getProgress() {
    let progress = 0;
    if (this.form && this.form.valid) {
      progress += 25;
    }
    return progress;
  }
}
