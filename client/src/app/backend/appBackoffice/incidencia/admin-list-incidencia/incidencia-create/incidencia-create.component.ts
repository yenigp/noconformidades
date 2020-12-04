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
import { IncidenciaService } from '../../../../services/incidencia/incidencia.service';
import { StateCreatingIncidenciaService } from '../../../../services/state-creating-incidencia/state-creating-incidencia.service';
import { IPagination } from 'src/app/core/classes/pagination.class';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-create-incidencia',
  templateUrl: './incidencia-create.component.html',
  styleUrls: ['./incidencia-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateIncidenciaComponent implements OnInit, OnDestroy {
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
  incidenciaCreated: any = null;
  _unsubscribeAll: Subject<any>;
  recomendedIncidencia: any[] = [];
  recomendedIncidenciaOutput: any[] = [];
  isSaving = false;
  isEditing = false;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  incidencia: any;
  Acciones: any[] = [];
  Resultado: any[] = ['procede', 'no procede'];
  Gravedad: any[] = ['crítica', 'mayor'];
  tipo: any[] = ['traslado', 'alojamiento', 'renta de autos', 'vuelo', 'restauración'];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  rellenarAcciones: boolean = false;
  aCasoAlgoCambioEnIncidencia: boolean = false;
  queryParams: any = {};
  alreadyLoaded: boolean = false;
  maxDate: Date;
  minDate: Date;
  hide = true;
  checked = false;
  disabled = false;
  myFilter = function (d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  // selectedIncidencia: number = 2;
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

  //////////////////////////////////////////

  ////////////////////////////////
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
    private incidenciaService: IncidenciaService,
    private stateIncidencia: StateCreatingIncidenciaService,
    private router: Router,
    private route: ActivatedRoute,

    private fb: FormBuilder,
  ) {
    this.incidencia = {};
    this._unsubscribeAll = new Subject<any>();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
    });
    this.getIncidencia();
    this.minDate = new Date(new Date().setDate(new Date().getDate() - 2));
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
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tipo.filter((tipo) => tipo.toLowerCase().indexOf(filterValue) === 0);
  }
  /////////////////////////////////////////

  /////////////////////////////////////////

  getIncidencia() {
    if (this.queryParams.IncidenciaId) {
      this.incidenciaService.getIncidencia({ id: this.queryParams.IncidenciaId }).subscribe(
        (data) => {
          this.incidenciaCreated = data.data;
          this.generarReport();
        },
        (err) => {
          this.utilsService.errorHandle(err, 'Incidencias', 'Listando');
        },
      );
    } else {
      this.generarReport();
    }
  }

  generarReport() {
    if (this.incidenciaCreated) {
      this.rellenarResumen(this.incidenciaCreated);
      this.rellenarAcciones = true;
    } else {
      this.rellenarAcciones = true;
    }
    this.buildForm();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Incidencia', false, '/backend/incidencia');
    if (this.loggedInUser.RolId == 9) {
      this.breadcrumbService.setBreadcrumd('Registrar incidencia', true);
    }
    if (this.loggedInUser.RolId == 7) {
      this.breadcrumbService.setBreadcrumd('Procesar incidencia', true);
    }
    if (this.loggedInUser.RolId == 3) {
      this.breadcrumbService.setBreadcrumd('Analizar incidencia', true);
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
    this.filteredOptions = this.form.controls['tipo'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  prepareIncidenciaResumen() {
    this.form.valueChanges.subscribe((val) => {
      this.rellenarResumen(val);
    });
  }

  rellenarResumen(val) {
    this.incidencia.codigo = val.NoConformidad.codigo ? val.NoConformidad.codigo : '';
    this.incidencia.FechaRegistro = val.NoConformidad.FechaRegistro ? val.NoConformidad.FechaRegistro : '';
    this.incidencia.FechaIdentificacion = val.NoConformidad.FechaIdentificacion
      ? val.NoConformidad.FechaIdentificacion
      : '';
    this.incidencia.FechaTermino = val.NoConformidad.FechaTermino ? val.NoConformidad.FechaTermino : '';
    this.incidencia.FechaCierre = val.NoConformidad.FechaCierre ? val.NoConformidad.FechaCierre : '';
    this.incidencia.ProcesoId = val.NoConformidad.Proceso.nombre ? val.NoConformidad.Proceso.nombre : '';
    this.incidencia.NormaId = val.NoConformidad.NormaId ? val.NoConformidad.Norma.nombre : '';
    this.incidencia.tipo = val.tipo ? val.tipo : '';
    if (val.CausaInvestigacion === true) {
      this.incidencia.CausaInvestigacion = 'Sí';
    }
    if (val.CausaInvestigacion === false) {
      this.incidencia.CausaInvestigacion = 'No';
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      ProcesoId: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.ProcesoId
          ? this.incidenciaCreated.NoConformidad.ProcesoId
          : null,
      ],
      NormaId: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.NormaId
          ? this.incidenciaCreated.NoConformidad.NormaId
          : null,
      ],
      FechaIdentificacion: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.FechaIdentificacion
          ? this.incidenciaCreated.NoConformidad.FechaIdentificacion
          : null,
      ],
      FechaRevision: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.FechaRevision
          ? this.incidenciaCreated.NoConformidad.FechaRevision
          : null,
      ],
      descripcion: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.descripcion
          ? this.incidenciaCreated.NoConformidad.descripcion
          : null,
      ],
      resultado: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.resultado
          ? this.incidenciaCreated.NoConformidad.resultado
          : null,
      ],
      gravedad: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.gravedad
          ? this.incidenciaCreated.NoConformidad.gravedad
          : null,
      ],
      EspCalidad: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.EspCalidad
          ? this.incidenciaCreated.NoConformidad.EspCalidad
          : null,
      ],
      JefeProceso: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.JefeProceso
          ? this.incidenciaCreated.NoConformidad.JefeProceso
          : null,
      ],
      AreaId: [
        this.incidenciaCreated && this.incidenciaCreated.NoConformidad.AreaId
          ? this.incidenciaCreated.NoConformidad.AreaId
          : null,
      ],
      tipo: [this.incidenciaCreated && this.incidenciaCreated.tipo ? this.incidenciaCreated.tipo : null],
      CausaInvestigacion: [
        this.incidenciaCreated && this.incidenciaCreated.CausaInvestigacion
          ? this.incidenciaCreated.CausaInvestigacion
          : null,
      ],
    });
    this.prepareIncidenciaResumen();
    this.form.valueChanges.subscribe((val) => {
      this.aCasoAlgoCambioEnIncidencia = true;
      this.action = 'Guardar';
    });
    this.alreadyLoaded = true;
  }

  onSaveBasicIncidencia(): void {
    this.spinner.show();
    let data = this.form.value;
    if (this.imageBrandChange) {
      data.evidencia = this.imageBrand;
    }
    this.spinner.show();
    if (this.incidenciaCreated) {
      if (this.aCasoAlgoCambioEnIncidencia) {
        data.id = this.incidenciaCreated.id;
        this.incidenciaService.editIncidencia(data).subscribe(
          (data) => {
            this.showToastr.showSucces('Incidencia actualizada exitosamente', 'Aviso');
            this.incidenciaCreated = data.data;
            if (this.loggedInUser.RolId == 9 || this.loggedInUser.RolId == 7) {
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
      this.incidenciaService.createIncidencia(data).subscribe(
        (data) => {
          this.showToastr.showSucces('Incidencia creada exitosamente', 'Aviso');
          this.incidenciaCreated = data.data;
          if (this.loggedInUser.RolId == 9 || this.loggedInUser.RolId == 7) {
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
    this.aCasoAlgoCambioEnIncidencia = true;
    this.Acciones = $event;
  }

  onClearStorage(): void {
    localStorage.removeItem('incidenciaCreated');
    this.incidenciaCreated = null;
    this.form.reset();
  }

  //////////////////////////////////////////////////////////////////////////
  Finalizar() {
    let data = {
      id: this.queryParams.IncidenciaId,
      Acciones: this.Acciones,
    };
    this.spinner.show();
    if (this.incidenciaCreated) {
      if (this.aCasoAlgoCambioEnIncidencia) {
        this.incidenciaService.editIncidencia(data).subscribe(
          (data) => {
            console.log(data);
            this.showToastr.showSucces('Incidencia actualizada exitosamente', 'Aviso');
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
      this.router.navigate(['/backend/incidencia']);
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
