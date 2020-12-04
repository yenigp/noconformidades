import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { IndicadoresService } from 'src/app/backend/services/indicadores/indicadores.service';
import { ProcesoService } from 'src/app/backend/services/proceso/proceso.service';
import { ObjetivosCalidadService } from 'src/app/backend/services/objetivoscalidad/objetivoscalidad.service';

@Component({
  selector: 'app-dialog-add-edit-indicadores',
  templateUrl: './dialog-add-edit-indicadores.component.html',
  styleUrls: ['./dialog-add-edit-indicadores.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditIndicadoresComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedIndicadores: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  Proceso: any[] = [];
  ObjetivosCalidad: any[] = [];
  TipoMedicion: any[] = ['Numérico', 'Porcentaje', 'Probabilidad', 'Medida-Impacto'];
  TipoAnalisis: any[] = ['Actividad', 'Calidad', 'Desempeño', 'Gestión', 'Objetivo', 'Proceso', 'Riesgo'];
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
  fontSizeControl = new FormControl(16, Validators.min(10));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditIndicadoresComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private indicadoresService: IndicadoresService,
    private procesoService: ProcesoService,
    private objetivoscalidadService: ObjetivosCalidadService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedIndicadores = data.selectedIndicadores;
    this.minDate = new Date();
    this.maxDate = new Date(new Date().setDate(new Date().getDate() + 30));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 600) {
      this.applyStyle = false;
    } else {
      this.applyStyle = true;
    }
  }

  //////////////////////////////////////////

  /////////////////////////////////////////

  ngOnInit(): void {
    this.createForm();
    this.procesoService.getAllProceso().subscribe((data) => {
      this.Proceso = data.data;
    });
    this.objetivoscalidadService.getAllObjetivosCalidad().subscribe((data) => {
      this.ObjetivosCalidad = data.data;
      console.log(this.ObjetivosCalidad);
    });
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        nombre: [
          this.selectedIndicadores && this.selectedIndicadores.nombre ? this.selectedIndicadores.nombre : null,
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)],
        ],
        ProcesoId: [
          this.selectedIndicadores && this.selectedIndicadores.ProcesoId ? this.selectedIndicadores.ProcesoId : null,
          [Validators.required],
        ],
        proposito: [
          this.selectedIndicadores && this.selectedIndicadores.proposito ? this.selectedIndicadores.proposito : null,
          [Validators.required],
        ],
        PlazoDesde: [
          this.selectedIndicadores && this.selectedIndicadores.PlazoDesde ? this.selectedIndicadores.PlazoDesde : null,
          [Validators.required],
        ],
        PlazoHasta: [
          this.selectedIndicadores && this.selectedIndicadores.PlazoHasta ? this.selectedIndicadores.PlazoHasta : null,
          [Validators.required],
        ],
        TipoMedicion: [
          this.selectedIndicadores && this.selectedIndicadores.TipoMedicion
            ? this.selectedIndicadores.TipoMedicion
            : null,
          [Validators.required],
        ],
        cumplimiento: [
          this.selectedIndicadores && this.selectedIndicadores.cumplimiento
            ? this.selectedIndicadores.cumplimiento
            : null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        FrecuenciaSeguimiento: [
          this.selectedIndicadores && this.selectedIndicadores.FrecuenciaSeguimiento
            ? this.selectedIndicadores.FrecuenciaSeguimiento
            : null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        TipoAnalisis: [
          this.selectedIndicadores && this.selectedIndicadores.TipoAnalisis
            ? this.selectedIndicadores.TipoAnalisis
            : null,
          [Validators.required],
        ],
        FrecuenciaAnalisis: [
          this.selectedIndicadores && this.selectedIndicadores.FrecuenciaAnalisis
            ? this.selectedIndicadores.FrecuenciaAnalisis
            : null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        ObjetivosCalidad: [
          this.selectedIndicadores && this.selectedIndicadores.ObjetivosCalidad
            ? this.selectedIndicadores.ObjetivosCalidad
            : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        nombre: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        ProcesoId: [null, [Validators.required]],
        proposito: [null, [Validators.required]],
        PlazoDesde: [null, [Validators.required]],
        PlazoHasta: [null, [Validators.required]],
        TipoMedicion: [null, [Validators.required]],
        cumplimiento: [
          null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        FrecuenciaSeguimiento: [
          null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        FrecuenciaAnalisis: [
          null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        TipoAnalisis: [null, [Validators.required]],
        ObjetivosCalidad: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.indicadoresService.createIndicadores(data).subscribe(
        (newindicadores) => {
          this.showToastr.showSucces('Indicador registrado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Indicador', 'Registrando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedIndicadores.id;
      console.log(data);
      this.indicadoresService.editIndicadores(data).subscribe(
        (newindicadores) => {
          this.showToastr.showSucces('Indicador actualizado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Indicador', 'Actualizado');
          this.spinner.hide();
        },
      );
    }
  }
}
