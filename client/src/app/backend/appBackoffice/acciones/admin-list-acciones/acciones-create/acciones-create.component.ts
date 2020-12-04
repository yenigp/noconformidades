import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { BreadcrumbService } from '../../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { AccionesService } from 'src/app/backend/services/acciones/acciones.service';
import { TareasService } from 'src/app/backend/services/tareas/tareas.service';
import { UserService } from 'src/app/backend/services/user/user.service';
import { TipoACService } from 'src/app/backend/services/tipoac/tipoac.service';

import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { IUser } from 'src/app/core/classes/user.class';

import { from, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { StateCreatingAccionesService } from '../../../../services/state-creating-acciones/state-creating-acciones.service';
import { IPagination } from 'src/app/core/classes/pagination.class';

@Component({
  selector: 'app-create-acciones',
  templateUrl: './acciones-create.component.html',
  styleUrls: ['./acciones-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateAccionesComponent implements OnInit, OnDestroy {
  stepIndex = 0;
  stepPass = 0;
  loggedInUser: IUser = null;
  accionesCreated: any = null;
  _unsubscribeAll: Subject<any>;
  recomendedacciones: any[] = [];
  recomendedaccionesOutput: any[] = [];
  isSaving = false;
  isEditing = false;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  Estado: any[] = ['registrada', 'revisada', 'aprobada', 'cerrada'];
  TipoAC: any[] = [];
  Tareas: any[] = [];
  acciones: any;
  rellenarTareas: boolean = false;
  aCasoAlgoCambioEnAcciones: boolean = false;
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
  allTareas: [] = [];
  // selectedacciones: number = 2;
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

  ////////////////////////////////
  @ViewChild('stepper', { static: false }) stepper: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private userService: UserService,
    private loggedInUserService: LoggedInUserService,
    private showToastr: ShowToastrService,
    private accionesService: AccionesService,
    private tipoacService: TipoACService,
    private stateacciones: StateCreatingAccionesService,
    private tareasService: TareasService,
    private router: Router,
    private route: ActivatedRoute,

    private fb: FormBuilder,
  ) {
    this.acciones = {};
    this._unsubscribeAll = new Subject<any>();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
    });
    this.getAcciones();
    this.minDate = new Date();
    this.maxDate = new Date(new Date().setDate(new Date().getDate() + 30));
  }

  getAcciones() {
    if (this.queryParams.AccionesId) {
      this.accionesService.getAcciones({ id: this.queryParams.AccionesId }).subscribe(
        (data) => {
          console.log(data);
          this.accionesCreated = data.data;
          this.generarReport();
        },
        (err) => {
          this.utilsService.errorHandle(err, 'Acciones', 'Listando');
        },
      );
    } else {
      this.generarReport();
    }
  }

  generarReport() {
    if (this.accionesCreated) {
      this.rellenarResumen(this.accionesCreated);
      this.rellenarTareas = true;
    } else {
      this.rellenarTareas = true;
    }
    this.buildForm();
  }

  ngOnInit() {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Acciones', false, '/backend/acciones');
    this.breadcrumbService.setBreadcrumd('Registrar acciones', true);
    this.tipoacService.getAllTipoAC().subscribe((data) => {
      this.TipoAC = data.data;
    });
    this.tareasService.getAllTareas().subscribe((data) => {
      this.allTareas = data.data;
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  prepareAccionesResumen() {
    this.form.valueChanges.subscribe((val) => {
      this.rellenarResumen(val);
    });
  }

  rellenarResumen(val) {
    this.acciones.codigo = val.codigo ? val.codigo : '';
    this.acciones.TipoId = val.TipoId ? val.Tipo.codigo : '';
    this.acciones.AccionTomar = val.AccionTomar ? val.AccionTomar : '';
    this.acciones.FechaCumplimiento = val.FechaCumplimiento ? val.FechaCumplimiento : '';
    this.acciones.estado = val.estado ? val.estado : '';
  }

  buildForm(): void {
    this.form = this.fb.group({
      codigo: [this.accionesCreated && this.accionesCreated.codigo ? this.accionesCreated.codigo : null],
      TipoId: [this.accionesCreated && this.accionesCreated.TipoId ? this.accionesCreated.TipoId : null],
      AccionTomar: [this.accionesCreated && this.accionesCreated.AccionTomar ? this.accionesCreated.AccionTomar : null],
      FechaCumplimiento: [
        this.accionesCreated && this.accionesCreated.FechaCumplimiento ? this.accionesCreated.FechaCumplimiento : null,
      ],
      estado: [this.accionesCreated && this.accionesCreated.estado ? this.accionesCreated.estado : null],
      Tareas: [this.accionesCreated && this.accionesCreated.Tareas ? this.accionesCreated.Tareas : null],
    });
    console.log(this.form);
    this.prepareAccionesResumen();
    this.form.valueChanges.subscribe((val) => {
      this.aCasoAlgoCambioEnAcciones = true;
      this.action = 'Guardar';
    });
    this.alreadyLoaded = true;
  }

  onSaveBasicAcciones(): void {
    this.spinner.show();
    let data = this.form.value;
    this.spinner.show();
    if (this.accionesCreated) {
      if (this.aCasoAlgoCambioEnAcciones) {
        data.id = this.accionesCreated.id;
        this.accionesService.editAcciones(data).subscribe(
          (data) => {
            this.showToastr.showSucces('Acción actualizada exitosamente', 'Aviso');
            this.accionesCreated = data.data;
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
      this.accionesService.createAcciones(data).subscribe(
        (data) => {
          this.showToastr.showSucces('Acción creada exitosamente', 'Aviso');
          this.accionesCreated = data.data;
          this.finalNavigation();
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

  ProcesarTareas($event) {
    this.aCasoAlgoCambioEnAcciones = true;
    this.Tareas = $event;
  }

  onClearStorage(): void {
    localStorage.removeItem('accionesCreated');
    this.accionesCreated = null;
    this.form.reset();
  }

  //////////////////////////////////////////////////////////////////////////
  Finalizar() {
    let data = {
      id: this.queryParams.AccionesId,
      Tareas: this.Tareas,
    };
    console.log(this.Tareas);
    this.spinner.show();
    if (this.accionesCreated) {
      if (this.aCasoAlgoCambioEnAcciones) {
        this.accionesService.editAcciones(data).subscribe(
          (data) => {
            console.log(data);
            this.showToastr.showSucces('Acción actualizada exitosamente', 'Aviso');
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
      this.router.navigate(['/backend/acciones']);
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
