import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { BreadcrumbService } from '../../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { AccionesService } from 'src/app/backend/services/acciones/acciones.service';
import { ProcesoService } from 'src/app/backend/services/proceso/proceso.service';
import { NormaService } from 'src/app/backend/services/norma/norma.service';
import { TipoNCService } from 'src/app/backend/services/tiponc/tiponc.service';
import { UserService } from 'src/app/backend/services/user/user.service';
import { AreaService } from 'src/app/backend/services/area/area.service';
import { ServicioService } from 'src/app/backend/services/servicio/servicio.service';
import { ProductoService } from 'src/app/backend/services/producto/producto.service';
import { ReservaService } from 'src/app/backend/services/reserva/reserva.service';

import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { IUser } from 'src/app/core/classes/user.class';

import { from, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NoConformidadService } from '../../../../services/noconformidad/noconformidad.service';
import { StateCreatingNoConformidadService } from '../../../../services/state-creating-noconformidad/state-creating-noconformidad.service';
import { IPagination } from 'src/app/core/classes/pagination.class';

@Component({
  selector: 'app-create-noconformidad',
  templateUrl: './noconformidad-create.component.html',
  styleUrls: ['./noconformidad-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateNoConformidadComponent implements OnInit, OnDestroy {
  Norma: any[] = [];
  Proceso: any[] = [];
  TipoNC: any[] = [];
  Servicio: any[] = [];
  allServicio: any[] = [];
  Reserva: any[] = [];
  allReserva: any[] = [];
  Producto: any[] = [];
  espcalidad: any;
  EspCalidad: any[] = [];
  jefeproceso: any;
  JefeProceso: any[] = [];
  Usuario: any[] = [];
  Area: any[] = [];
  stepIndex = 0;
  stepPass = 0;
  loggedInUser: IUser = null;
  noconformidadCreated: any = null;
  _unsubscribeAll: Subject<any>;
  recomendedNoConformidad: any[] = [];
  recomendedNoConformidadOutput: any[] = [];
  isSaving = false;
  isEditing = false;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  noconformidad: any;
  Acciones: any[] = [];
  Resultado: any[] = ['procede', 'no procede'];
  Gravedad: any[] = ['crítica', 'mayor'];
  tipo: any[] = ['traslado', 'alojamiento', 'renta de autos', 'vuelo', 'restauración'];
  tipoqr: any[] = ['queja', 'reclamación'];
  clasificacion: any[] = ['interna', 'externa'];
  rellenarUsuarios: boolean = false;
  aCasoAlgoCambioEnNoConformidad: boolean = false;
  queryParams: any = {};
  alreadyLoaded: boolean = false;
  maxDate: Date;
  minDate: Date;
  hide = true;
  // selectedNoConformidad: number = 2;
  ////////////////////Pagination Structure/////////////////////
  query: IPagination = {
    limit: 0,
    total: 0,
    offset: 0,
    order: '-updatedAt',
    page: 1,
    filter: { filterText: '', properties: [] },
  };
  action: string = 'Siguente';

  //////////////////////////////////////////
  /**
   * Session para referencias externas
   */
  getAllAcciones(): void {
    this.accionesService.getAllAcciones(this.query).subscribe(
      (data) => {
        this.Acciones = data.data;
      },
      (error) => {
        console.log(error);
        this.utilsService.errorHandle(error);
      },
    );
  }

  ////////////////////////////////
  @ViewChild('stepper', { static: false }) stepper: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private accionesService: AccionesService,
    private normaService: NormaService,
    private procesoService: ProcesoService,
    private tipoNCService: TipoNCService,
    private userService: UserService,
    private areaService: AreaService,
    private servicioService: ServicioService,
    private productoService: ProductoService,
    private reservaService: ReservaService,
    private loggedInUserService: LoggedInUserService,
    private showToastr: ShowToastrService,
    private noconformidadService: NoConformidadService,
    private stateNoConformidad: StateCreatingNoConformidadService,
    private router: Router,
    private route: ActivatedRoute,

    private fb: FormBuilder,
  ) {
    this.noconformidad = {};
    this.getAllAcciones();
    this._unsubscribeAll = new Subject<any>();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
    });
    this.getNoConformidad();
    this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    this.maxDate = new Date();
    this.espcalidad = {};
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
    this.allServicio = this.Servicio.filter((item) => item.idproducto == id);
    this.allReserva = this.Reserva.filter((item) => item.idproducto == id);
  }

  /////////////////////////////////////////

  getNoConformidad() {
    if (this.queryParams.NoConformidadId) {
      this.noconformidadService.getNoConformidad({ id: this.queryParams.NoConformidadId }).subscribe(
        (data) => {
          this.noconformidadCreated = data.data;
          this.generarReport();
        },
        (err) => {
          this.utilsService.errorHandle(err, 'No Conformidad', 'Listando');
        },
      );
    } else {
      this.generarReport();
    }
  }

  generarReport() {
    if (this.noconformidadCreated) {
      this.rellenarResumen(this.noconformidadCreated);
      this.rellenarUsuarios = true;
    } else {
      this.rellenarUsuarios = true;
    }
    this.buildForm();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('NoConformidad', false, '/backend/noconformidad');
    this.breadcrumbService.setBreadcrumd('Agregar no conformidad', true);

    this.accionesService.getAllAcciones().subscribe((data) => {
      this.Acciones = data.data;
    });
    this.normaService.getAllNorma().subscribe((data) => {
      console.log(data.data);
      this.Norma = data.data;
    });
    this.procesoService.getAllProceso().subscribe((data) => {
      this.Proceso = data.data;
    });
    this.tipoNCService.getAllTipoNC().subscribe((data) => {
      this.TipoNC = data.data;
    });
    this.areaService.getAllArea().subscribe((data) => {
      this.Area = data.data;
    });
    this.userService.getAllUsers().subscribe((data) => {
      this.Usuario = data.data;
      this.EspCalidad.push(this.Usuario.find((item) => item.Role.nombre === 'EspCalidadSucursal'));
      this.JefeProceso.push(this.Usuario.find((item) => item.Role.nombre === 'JefeProceso'));
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

  prepareNoConformidadResumen() {
    this.form.valueChanges.subscribe((val) => {
      this.rellenarResumen(val);
    });
  }

  rellenarResumen(val) {
    this.noconformidad.codigo = val.codigo ? val.codigo : '';
    this.noconformidad.FechaRegistro = val.FechaRegistro ? val.FechaRegistro : '';
    this.noconformidad.FechaTermino = val.FechaTermino ? val.FechaTermino : '';
    this.noconformidad.ProcesoId = val.ProcesoId ? val.ProcesoId : '';
    this.noconformidad.NormaId = val.NormaId ? val.NormaId : '';
    this.noconformidad.TipoId = val.TipoId ? val.TipoId : '';
  }

  buildForm(): void {
    this.form = this.fb.group({
      TipoId: [
        this.noconformidadCreated && this.noconformidadCreated.TipoId ? this.noconformidadCreated.TipoId : null,
        [Validators.required],
      ],
      ProcesoId: [
        this.noconformidadCreated && this.noconformidadCreated.ProcesoId ? this.noconformidadCreated.ProcesoId : null,
        [Validators.required],
      ],
      NormaId: [
        this.noconformidadCreated && this.noconformidadCreated.NormaId ? this.noconformidadCreated.NormaId : null,
        [Validators.required],
      ],
      FechaIdentificacion: [
        this.noconformidadCreated && this.noconformidadCreated.FechaIdentificacion
          ? this.noconformidadCreated.FechaIdentificacion
          : null,
        [Validators.required],
      ],
      FechaRevision: [
        this.noconformidadCreated && this.noconformidadCreated.FechaRevision
          ? this.noconformidadCreated.FechaRevision
          : null,
      ],
      status: [this.noconformidadCreated && this.noconformidadCreated.status ? this.noconformidadCreated.status : null],
      descripcion: [
        this.noconformidadCreated && this.noconformidadCreated.descripcion
          ? this.noconformidadCreated.descripcion
          : null,
        [Validators.required],
      ],
      resultado: [
        this.noconformidadCreated && this.noconformidadCreated.resultado ? this.noconformidadCreated.resultado : null,
      ],
      gravedad: [
        this.noconformidadCreated && this.noconformidadCreated.gravedad ? this.noconformidadCreated.gravedad : null,
      ],
      EspCalidad: [
        this.noconformidadCreated && this.noconformidadCreated.EspCalidad ? this.noconformidadCreated.EspCalidad : null,
      ],
      JefeProceso: [
        this.noconformidadCreated && this.noconformidadCreated.JefeProceso
          ? this.noconformidadCreated.JefeProceso
          : null,
      ],
      AreaId: [this.noconformidadCreated && this.noconformidadCreated.AreaId ? this.noconformidadCreated.AreaId : null],
      tipo: [this.noconformidadCreated && this.noconformidadCreated.tipo ? this.noconformidadCreated.tipo : null],
      CausaInvestigacion: [
        this.noconformidadCreated && this.noconformidadCreated.CausaInvestigacion
          ? this.noconformidadCreated.CausaInvestigacion
          : null,
      ],
      observacion: [
        this.noconformidadCreated && this.noconformidadCreated.observacion
          ? this.noconformidadCreated.observacion
          : null,
      ],
      ProductoId: [
        this.noconformidadCreated && this.noconformidadCreated.ProductoId ? this.noconformidadCreated.ProductoId : null,
      ],
      ServicioId: [
        this.noconformidadCreated && this.noconformidadCreated.ServicioId ? this.noconformidadCreated.ServicioId : null,
      ],
      ReservaId: [
        this.noconformidadCreated && this.noconformidadCreated.ReservaId ? this.noconformidadCreated.ReservaId : null,
      ],
      clasificacion: [
        this.noconformidadCreated && this.noconformidadCreated.clasificacion
          ? this.noconformidadCreated.clasificacion
          : null,
      ],
      CostoNoCalidad: [
        this.noconformidadCreated && this.noconformidadCreated.CostoNoCalidad
          ? this.noconformidadCreated.CostoNoCalidad
          : null,
      ],
    });
    this.prepareNoConformidadResumen();
    this.form.valueChanges.subscribe((val) => {
      this.aCasoAlgoCambioEnNoConformidad = true;
      this.action = 'Guardar';
    });
    this.alreadyLoaded = true;
  }

  onSaveBasicNoConformidad(): void {
    this.spinner.show();
    let data = this.form.value;
    if (this.imageBrandChange) {
      data.evidencia = this.imageBrand;
    }
    this.spinner.show();
    if (this.noconformidadCreated) {
      if (this.aCasoAlgoCambioEnNoConformidad) {
        data.id = this.noconformidadCreated.id;
        this.noconformidadService.editNoConformidad(data).subscribe(
          (data) => {
            this.showToastr.showSucces('No conformidad actualizada exitosamente', 'Aviso');
            this.noconformidadCreated = data.data;
            this.stepIndex += 1;
            this.spinner.hide();
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
      this.noconformidadService.createNoConformidad(data).subscribe(
        (data) => {
          this.showToastr.showSucces('No conformidad creada exitosamente', 'Aviso');
          this.noconformidadCreated = data.data;
          this.stepIndex += 1;
          this.spinner.hide();
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

  ProcesarUsuarios($event) {
    this.aCasoAlgoCambioEnNoConformidad = true;
    this.Usuario = $event;
  }

  onClearStorage(): void {
    localStorage.removeItem('noconformidadCreated');
    this.noconformidadCreated = null;
    // this.showToastr.showSucces('El estado de almacenamiento del producto ha sido eliminado', "Aviso");
    this.form.reset();
  }

  //////////////////////////////////////////////////////////////////////////
  Finalizar() {
    /**
     * esta accion debe coger el id del deploy creado y darle un patch
     * con el arreglo de web Clients
     * y luego de eso hacer un redirect para el listado de no conformidades
     */
    let data = {
      id: this.noconformidadCreated.id,
      Usuario: this.Usuario,
    };
    this.spinner.show();
    if (this.noconformidadCreated) {
      if (this.aCasoAlgoCambioEnNoConformidad) {
        this.noconformidadService.editNoConformidad(data).subscribe(
          (data) => {
            this.showToastr.showSucces('No conformidad actualizada exitosamente', 'Aviso');
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
      this.router.navigate(['/backend/noconformidad']);
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
