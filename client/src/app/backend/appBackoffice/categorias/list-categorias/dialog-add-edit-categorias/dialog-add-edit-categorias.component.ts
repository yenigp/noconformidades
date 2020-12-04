import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { CategoriasService } from 'src/app/backend/services/categorias/categorias.service';
import { EncuestasService } from 'src/app/backend/services/encuentas/encuestas.service';

@Component({
  selector: 'app-dialog-add-edit-categorias',
  templateUrl: './dialog-add-edit-categorias.component.html',
  styleUrls: ['./dialog-add-edit-categorias.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditCategoriasComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedCategorias: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  allEncuestas: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditCategoriasComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private categoriasService: CategoriasService,
    private encuestasService: EncuestasService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedCategorias = data.selectedCategorias;
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
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        nombre: [
          this.selectedCategorias && this.selectedCategorias.nombre ? this.selectedCategorias.nombre : null,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(2),
            Validators.pattern('^(?=.{3,50}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$'),
          ],
        ],
        descripcion: [
          this.selectedCategorias && this.selectedCategorias.descripcion ? this.selectedCategorias.descripcion : null,
          [Validators.required],
        ],
        EncuestaId: [
          this.selectedCategorias && this.selectedCategorias.EncuestaId ? this.selectedCategorias.EncuestaId : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        nombre: [
          null,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(2),
            Validators.pattern('^(?=.{3,50}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$'),
          ],
        ],
        descripcion: [null, [Validators.required]],
        EncuestaId: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.categoriasService.createCategorias(data).subscribe(
        (newcategorias) => {
          this.showToastr.showSucces('Categoría registrada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Categoría', 'Registrando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedCategorias.id;
      console.log(data);
      this.categoriasService.editCategorias(data).subscribe(
        (newcategorias) => {
          this.showToastr.showSucces('Categoría actualizada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Categoría', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
