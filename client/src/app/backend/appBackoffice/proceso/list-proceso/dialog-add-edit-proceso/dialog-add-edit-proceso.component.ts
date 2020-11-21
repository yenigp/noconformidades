import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { ProcesoService } from 'src/app/backend/services/proceso/proceso.service';
import { UserService } from 'src/app/backend/services/user/user.service';

@Component({
  selector: 'app-dialog-add-edit-proceso',
  templateUrl: './dialog-add-edit-proceso.component.html',
  styleUrls: ['./dialog-add-edit-proceso.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditProcesoComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedProceso: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  jefeproceso: any;
  Usuario: any[] = [];
  JefeProceso: any[] = [];
  tipo: any[] = ['realización', 'estratégico', 'de apoyo'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditProcesoComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private procesoService: ProcesoService,
    private userService: UserService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.jefeproceso = data.jefeproceso;
    this.selectedProceso = data.selectedProceso;
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
    this.userService.getAllUsers().subscribe((data) => {
      this.Usuario = data.data;
      console.log();
      this.JefeProceso.push(this.Usuario.find((item) => item.Role.nombre === 'JefeProceso'));
      console.log(this.JefeProceso);
    });
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        codigo: [
          this.selectedProceso && this.selectedProceso.codigo ? this.selectedProceso.codigo : null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[A-Z]*')],
        ],
        nombre: [
          this.selectedProceso && this.selectedProceso.nombre ? this.selectedProceso.nombre : null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        ],
        tipo: [
          this.selectedProceso && this.selectedProceso.tipo ? this.selectedProceso.tipo : null,
          [Validators.required],
        ],
        JefeProceso: [
          this.selectedProceso && this.selectedProceso.JefeProceso ? this.selectedProceso.JefeProceso : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        codigo: [
          null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[A-Z]*')],
        ],
        nombre: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        tipo: [null, [Validators.required]],
        JefeProceso: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.procesoService.createProceso(data).subscribe(
        (newProceso) => {
          this.showToastr.showSucces('Proceso registrado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Proceso', 'Agregando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedProceso.id;
      console.log(data);
      this.procesoService.editProceso(data).subscribe(
        (newProceso) => {
          this.showToastr.showSucces(
            'Proceso' + '' + this.selectedProceso.codigo + '' + 'actualizado satisfactoriamente',
          );
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Proceso', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
