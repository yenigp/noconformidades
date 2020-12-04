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
import { ServicioService } from 'src/app/backend/services/servicio/servicio.service';
import { ProductoService } from 'src/app/backend/services/producto/producto.service';
import { ReservaService } from 'src/app/backend/services/reserva/reserva.service';

import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { IUser } from 'src/app/core/classes/user.class';

import { from, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { QuejasReclamacionesService } from '../../../../services/quejasreclamaciones/quejasreclamaciones.service';
import { StateCreatingQuejasReclamacionesService } from '../../../../services/state-creating-quejasreclamaciones/state-creating-quejasreclamaciones.service';
import { IPagination } from 'src/app/core/classes/pagination.class';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-create-quejasreclamaciones',
  templateUrl: './quejasreclamaciones-create.component.html',
  styleUrls: ['./quejasreclamaciones-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateQuejasReclamacionesComponent implements OnInit, OnDestroy {
  Norma: any[] = [];
  Proceso: any[] = [];
  Servicio: any[] = [];
  allServicio: any[] = [];
  Reserva: any[] = [];
  allReserva: any[] = [];
  Producto: any[] = [];
  jefeproceso: any;
  JefeProceso: any[] = [];
  allSucursal: any[] = [];
  Usuario: any[] = [];
  Area: any[] = [];
  stepIndex = 0;
  stepPass = 0;
  loggedInUser: IUser = null;
  quejasreclamacionesCreated: any = null;
  _unsubscribeAll: Subject<any>;
  recomendedQuejasReclamaciones: any[] = [];
  recomendedQuejasReclamacionesOutput: any[] = [];
  isSaving = false;
  isEditing = false;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  filteredOptions: Observable<string[]>;
  quejasreclamaciones: any;
  Acciones: any[] = [];
  allAcciones: any[] = [];
  Resultado: any[] = ['procede', 'no procede'];
  Gravedad: any[] = ['crítica', 'mayor'];
  tipoqr: any[] = ['queja', 'reclamación'];
  clasificacion: any[] = ['interna', 'externa'];
  rellenarAcciones: boolean = false;
  aCasoAlgoCambioEnQuejasReclamaciones: boolean = false;
  queryParams: any = {};
  alreadyLoaded: boolean = false;
  maxDate: Date;
  minDate: Date;
  hide = true;
  myFilter = function (d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  // selectedQuejasReclamaciones: number = 2;
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
    private servicioService: ServicioService,
    private productoService: ProductoService,
    private reservaService: ReservaService,
    private loggedInUserService: LoggedInUserService,
    private showToastr: ShowToastrService,
    private quejasreclamacionesService: QuejasReclamacionesService,
    private stateQuejasReclamaciones: StateCreatingQuejasReclamacionesService,
    private router: Router,
    private route: ActivatedRoute,

    private fb: FormBuilder,
  ) {
    this.quejasreclamaciones = {};
    this._unsubscribeAll = new Subject<any>();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
    });
    this.getQuejasReclamaciones();
    this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
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
  onChange(id: any): void {
    console.log(id);
    this.allServicio = this.Servicio.filter((item) => item.idproducto == id);
    this.allReserva = this.Reserva.filter((item) => item.idproducto == id);
  }

  /////////////////////////////////////////

  getQuejasReclamaciones() {
    if (this.queryParams.QuejasReclamacionesId) {
      this.quejasreclamacionesService.getQuejasReclamaciones({ id: this.queryParams.QuejasReclamacionesId }).subscribe(
        (data) => {
          console.log(data);
          this.quejasreclamacionesCreated = data.data;
          this.generarReport();
        },
        (err) => {
          this.utilsService.errorHandle(err, 'Quejas y Reclamaciones', 'Listando');
        },
      );
    } else {
      this.generarReport();
    }
  }

  generarReport() {
    if (this.quejasreclamacionesCreated) {
      this.rellenarResumen(this.quejasreclamacionesCreated);
      this.rellenarAcciones = true;
    } else {
      this.rellenarAcciones = true;
    }
    this.buildForm();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('QuejasReclamaciones', false, '/backend/quejasreclamaciones');
    if (this.loggedInUser.RolId == 7) {
      this.breadcrumbService.setBreadcrumd('Registrar queja o reclamación', true);
    }
    if (this.loggedInUser.RolId == 3) {
      this.breadcrumbService.setBreadcrumd('Analizar queja o reclamación', true);
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
    });
    this.servicioService.getAllServicio().subscribe((data) => {
      this.Servicio = data.data;
    });
    this.productoService.getAllProducto().subscribe((data) => {
      this.Producto = data.data;
    });
    this.reservaService.getAllReserva().subscribe((data) => {
      this.Reserva = data.data;
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  prepareQuejasReclamacionesResumen() {
    this.form.valueChanges.subscribe((val) => {
      this.rellenarResumen(val);
    });
  }

  rellenarResumen(val) {
    this.quejasreclamaciones.codigo = val.NoConformidad.codigo ? val.NoConformidad.codigo : '';
    this.quejasreclamaciones.FechaRegistro = val.NoConformidad.FechaRegistro ? val.NoConformidad.FechaRegistro : '';
    this.quejasreclamaciones.FechaIdentificacion = val.NoConformidad.FechaIdentificacion
      ? val.NoConformidad.FechaIdentificacion
      : '';
    this.quejasreclamaciones.FechaTermino = val.NoConformidad.FechaTermino ? val.NoConformidad.FechaTermino : '';
    this.quejasreclamaciones.FechaCierre = val.NoConformidad.FechaCierre ? val.NoConformidad.FechaCierre : '';
    this.quejasreclamaciones.ProcesoId = val.NoConformidad.Proceso.nombre ? val.NoConformidad.Proceso.nombre : '';
    this.quejasreclamaciones.NormaId = val.NoConformidad.NormaId ? val.NoConformidad.Norma.nombre : '';
    this.quejasreclamaciones.tipo = val.tipo ? val.tipo : '';
    this.quejasreclamaciones.ProductoId = val.Producto.nombproducto ? val.Producto.nombproducto : '';
    this.quejasreclamaciones.ServicioId = val.ProdServicio.nombservicio ? val.ProdServicio.nombservicio : '';
    this.quejasreclamaciones.ReservaId = val.Reserva.locreservapadre ? val.Reserva.locreservapadre : '';
  }

  buildForm(): void {
    this.form = this.fb.group({
      ProcesoId: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.ProcesoId
          ? this.quejasreclamacionesCreated.NoConformidad.ProcesoId
          : null,
      ],
      NormaId: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.NormaId
          ? this.quejasreclamacionesCreated.NoConformidad.NormaId
          : null,
      ],
      FechaIdentificacion: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.FechaIdentificacion
          ? this.quejasreclamacionesCreated.NoConformidad.FechaIdentificacion
          : null,
      ],
      FechaRevision: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.FechaRevision
          ? this.quejasreclamacionesCreated.NoConformidad.FechaRevision
          : null,
      ],
      descripcion: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.descripcion
          ? this.quejasreclamacionesCreated.NoConformidad.descripcion
          : null,
      ],
      resultado: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.resultado
          ? this.quejasreclamacionesCreated.NoConformidad.resultado
          : null,
      ],
      gravedad: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.gravedad
          ? this.quejasreclamacionesCreated.NoConformidad.gravedad
          : null,
      ],
      JefeProceso: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.JefeProceso
          ? this.quejasreclamacionesCreated.NoConformidad.JefeProceso
          : null,
      ],
      AreaId: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.NoConformidad.AreaId
          ? this.quejasreclamacionesCreated.NoConformidad.AreaId
          : null,
      ],
      tipo: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.tipo
          ? this.quejasreclamacionesCreated.tipo
          : null,
      ],
      observacion: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.observacion
          ? this.quejasreclamacionesCreated.observacion
          : null,
      ],
      ProductoId: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.ProductoId
          ? this.quejasreclamacionesCreated.ProductoId
          : null,
      ],
      ServicioId: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.ServicioId
          ? this.quejasreclamacionesCreated.ServicioId
          : null,
      ],
      ReservaId: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.ReservaId
          ? this.quejasreclamacionesCreated.ReservaId
          : null,
      ],
      clasificacion: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.clasificacion
          ? this.quejasreclamacionesCreated.clasificacion
          : null,
      ],
      CostoNoCalidad: [
        this.quejasreclamacionesCreated && this.quejasreclamacionesCreated.CostoNoCalidad
          ? this.quejasreclamacionesCreated.CostoNoCalidad
          : null,
      ],
    });
    console.log(this.form);
    this.prepareQuejasReclamacionesResumen();
    this.form.valueChanges.subscribe((val) => {
      this.aCasoAlgoCambioEnQuejasReclamaciones = true;
      this.action = 'Guardar';
    });
    this.alreadyLoaded = true;
  }

  onSaveBasicQuejasReclamaciones(): void {
    this.spinner.show();
    let data = this.form.value;
    if (this.imageBrandChange) {
      data.evidencia = this.imageBrand;
    }
    this.spinner.show();
    if (this.quejasreclamacionesCreated) {
      if (this.aCasoAlgoCambioEnQuejasReclamaciones) {
        data.id = this.quejasreclamacionesCreated.id;
        this.quejasreclamacionesService.editQuejasReclamaciones(data).subscribe(
          (data) => {
            this.showToastr.showSucces('Quejas o reclamación actualizada exitosamente', 'Aviso');
            this.quejasreclamacionesCreated = data.data;
            if (this.loggedInUser.RolId == 7) {
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
      this.quejasreclamacionesService.createQuejasReclamaciones(data).subscribe(
        (data) => {
          this.showToastr.showSucces('Queja o reclamación creada exitosamente', 'Aviso');
          this.quejasreclamacionesCreated = data.data;
          if (this.loggedInUser.RolId == 7) {
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
    this.aCasoAlgoCambioEnQuejasReclamaciones = true;
    this.Acciones = $event;
  }

  onClearStorage(): void {
    localStorage.removeItem('quejareclamacionCreated');
    console.log(this.quejasreclamacionesCreated);
    this.quejasreclamacionesCreated = null;
    this.form.reset();
  }

  //////////////////////////////////////////////////////////////////////////
  Finalizar() {
    let data = {
      id: this.queryParams.QuejasReclamacionesId,
      Acciones: this.Acciones,
    };
    this.spinner.show();
    if (this.quejasreclamacionesCreated) {
      if (this.aCasoAlgoCambioEnQuejasReclamaciones) {
        this.quejasreclamacionesService.editQuejasReclamaciones(data).subscribe(
          (data) => {
            console.log(data);
            this.showToastr.showSucces('Queja o reclamación actualizada exitosamente', 'Aviso');
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
      this.router.navigate(['/backend/quejasreclamaciones']);
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
