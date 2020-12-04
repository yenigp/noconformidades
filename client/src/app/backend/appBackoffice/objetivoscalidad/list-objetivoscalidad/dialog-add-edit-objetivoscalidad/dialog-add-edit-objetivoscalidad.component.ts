import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { ObjetivosCalidadService } from 'src/app/backend/services/objetivoscalidad/objetivoscalidad.service';
import { IndicadoresService } from 'src/app/backend/services/indicadores/indicadores.service';

@Component({
  selector: 'app-dialog-add-edit-objetivoscalidad',
  templateUrl: './dialog-add-edit-objetivoscalidad.component.html',
  styleUrls: ['./dialog-add-edit-objetivoscalidad.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditObjetivosCalidadComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedObjetivosCalidad: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  Indicadores: any[] = [];
  ObjetivosCalidad: any[] = [];
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
    public dialogRef: MatDialogRef<DialogAddEditObjetivosCalidadComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private indicadoresService: IndicadoresService,
    private objetivoscalidadService: ObjetivosCalidadService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedObjetivosCalidad = data.selectedObjetivosCalidad;
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
    this.indicadoresService.getAllIndicadores().subscribe((data) => {
      this.Indicadores = data.data;
    });
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        nombre: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.nombre
            ? this.selectedObjetivosCalidad.nombre
            : null,
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)],
        ],
        FechaComienzo: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.FechaComienzo
            ? this.selectedObjetivosCalidad.FechaComienzo
            : null,
          [Validators.required],
        ],
        FechaFin: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.FechaFin
            ? this.selectedObjetivosCalidad.FechaFin
            : null,
          [Validators.required],
        ],
        ValorAlcanzar: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.ValorAlcanzar
            ? this.selectedObjetivosCalidad.ValorAlcanzar
            : null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        cumplimiento: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.cumplimiento
            ? this.selectedObjetivosCalidad.cumplimiento
            : null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        PeriodicidadSeguimiento: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.PeriodicidadSeguimiento
            ? this.selectedObjetivosCalidad.PeriodicidadSeguimiento
            : null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        comentario: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.comentario
            ? this.selectedObjetivosCalidad.comentario
            : null,
          [Validators.required],
        ],
        Indicadores: [
          this.selectedObjetivosCalidad && this.selectedObjetivosCalidad.Indicadores
            ? this.selectedObjetivosCalidad.Indicadores
            : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        nombre: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        FechaComienzo: [null, [Validators.required]],
        FechaFin: [null, [Validators.required]],
        ValorAlcanzar: [
          null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        cumplimiento: [
          null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        PeriodicidadSeguimiento: [
          null,
          [Validators.required, Validators.maxLength(3), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        ],
        comentario: [null, [Validators.required]],
        Indicadores: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.objetivoscalidadService.createObjetivosCalidad(data).subscribe(
        (newobjetivoscalidad) => {
          this.showToastr.showSucces('Objetivo registrado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Objetivo', 'Registrando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedObjetivosCalidad.id;
      console.log(data);
      this.objetivoscalidadService.editObjetivosCalidad(data).subscribe(
        (newobjetivoscalidad) => {
          this.showToastr.showSucces('Objetivo actualizado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Objetivo', 'Actualizado');
          this.spinner.hide();
        },
      );
    }
  }
}
