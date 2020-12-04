import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { TareasService } from 'src/app/backend/services/tareas/tareas.service';
import { UserService } from 'src/app/backend/services/user/user.service';

@Component({
  selector: 'app-dialog-add-edit-tareas',
  templateUrl: './dialog-add-edit-tareas.component.html',
  styleUrls: ['./dialog-add-edit-tareas.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditTareasComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedTareas: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  maxDate: Date;
  minDate: Date;
  hide = true;
  estado: any[] = ['registrada', 'revisada', 'cerrada'];
  startDate = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditTareasComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private tareasService: TareasService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.minDate = new Date();
    this.maxDate = new Date(new Date().setDate(new Date().getDate() + 30));
    this.selectedTareas = data.selectedTareas;
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
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        nombre: [
          this.selectedTareas && this.selectedTareas.nombre ? this.selectedTareas.nombre : null,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(2),
            Validators.pattern(
              '^(?=.{3,50}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [a-zñáéíóú]+)+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)+(?: [A-ZÁÉÍÓÚa-zñáéíóú]+)?$',
            ),
          ],
        ],
        descripcion: [
          this.selectedTareas && this.selectedTareas.descripcion ? this.selectedTareas.descripcion : null,
          [Validators.required],
        ],
        FechaComienzo: [
          this.selectedTareas && this.selectedTareas.FechaComienzo ? this.selectedTareas.FechaComienzo : null,
          [Validators.required],
        ],
        FechaFin: [
          this.selectedTareas && this.selectedTareas.FechaFin ? this.selectedTareas.FechaFin : null,
          [Validators.required],
        ],
        estado: [
          this.selectedTareas && this.selectedTareas.estado ? this.selectedTareas.estado : null,
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
            Validators.pattern(
              '^(?=.{3,50}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [a-zñáéíóú]+)+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)+(?: [A-ZÁÉÍÓÚa-zñáéíóú]+)?$',
            ),
          ],
        ],
        descripcion: [null, [Validators.required]],
        FechaComienzo: [null, [Validators.required]],
        FechaFin: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.tareasService.createTareas(data).subscribe(
        (newTarea) => {
          this.showToastr.showSucces('Tarea registrada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Tarea', 'Agregando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedTareas.id;
      console.log(data);
      this.tareasService.editTareas(data).subscribe(
        (newArea) => {
          this.showToastr.showSucces('Tarea actualizada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Tarea', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
