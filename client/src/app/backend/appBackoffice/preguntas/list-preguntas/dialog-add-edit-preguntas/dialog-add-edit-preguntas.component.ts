import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { PreguntasService } from 'src/app/backend/services/preguntas/preguntas.service';
import { CategoriasService } from 'src/app/backend/services/categorias/categorias.service';
import { EncuestasService } from 'src/app/backend/services/encuentas/encuestas.service';

@Component({
  selector: 'app-dialog-add-edit-preguntas',
  templateUrl: './dialog-add-edit-preguntas.component.html',
  styleUrls: ['./dialog-add-edit-preguntas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditPreguntasComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedPreguntas: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  allEncuestas: any[] = [];
  allCategorias: any[] = [];
  estado: any[] = ['abierta', 'cerrada'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditPreguntasComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private preguntasService: PreguntasService,
    private encuestasService: EncuestasService,
    private categoriasService: CategoriasService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedPreguntas = data.selectedPreguntas;
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

  ngOnInit(): void {
    this.createForm();
    this.encuestasService.getAllEncuestas().subscribe((data) => {
      this.allEncuestas = data.data;
      console.log(this.allEncuestas);
    });
    this.categoriasService.getAllCategorias().subscribe((data) => {
      this.allCategorias = data.data;
      console.log(this.allCategorias);
    });
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        texto: [
          this.selectedPreguntas && this.selectedPreguntas.texto ? this.selectedPreguntas.texto : null,
          [Validators.required, Validators.maxLength(50), Validators.minLength(2)],
        ],
        CategoriaId: [
          this.selectedPreguntas && this.selectedPreguntas.CategoriaId ? this.selectedPreguntas.CategoriaId : null,
          [Validators.required],
        ],
        EncuestaId: [
          this.selectedPreguntas && this.selectedPreguntas.EncuestaId ? this.selectedPreguntas.EncuestaId : null,
          [Validators.required],
        ],
        estado: [
          this.selectedPreguntas && this.selectedPreguntas.estado ? this.selectedPreguntas.estado : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        texto: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        CategoriaId: [null, [Validators.required]],
        EncuestaId: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.preguntasService.createPreguntas(data).subscribe(
        (newpreguntas) => {
          this.showToastr.showSucces('Preguntas registrada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Preguntas', 'Registrando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedPreguntas.id;
      console.log(data);
      this.preguntasService.editPreguntas(data).subscribe(
        (newpreguntas) => {
          this.showToastr.showSucces('Preguntas actualizada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Preguntas', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
