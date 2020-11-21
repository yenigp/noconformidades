import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { UsuarioService } from 'src/app/backend/services/usuario/usuario.service';

@Component({
  selector: 'app-dialog-add-edit-usuario',
  templateUrl: './dialog-add-edit-usuario.component.html',
  styleUrls: ['./dialog-add-edit-usuario.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditUsuarioComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedUsuario: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  types: any[] = ['api', 'client', 'app', 'extra'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditUsuarioComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private usuarioService: UsuarioService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedUsuario = data.selectedUsuario;
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
          this.selectedUsuario && this.selectedUsuario.nombre ? this.selectedUsuario.nombre : null,
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(2),
            Validators.pattern('^[A-Z{1}a-z{14}]*$'),
          ],
        ],
        apellidos: [
          this.selectedUsuario && this.selectedUsuario.apellidos ? this.selectedUsuario.apellidos : null,
          [Validators.required],
        ],
        usuario: [
          this.selectedUsuario && this.selectedUsuario.usuario ? this.selectedUsuario.usuario : null,
          [Validators.required],
        ],
        email: [
          this.selectedUsuario && this.selectedUsuario.email ? this.selectedUsuario.email : null,
          [Validators.required],
        ],
        password: [
          this.selectedUsuario && this.selectedUsuario.password ? this.selectedUsuario.password : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        nombre: [
          null,
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(2),
            Validators.pattern('^[A-Z]{1}[a-z]]*$'),
          ],
        ],
        apellidos: [null, [Validators.required]],
        usuario: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.usuarioService.createUsuario(data).subscribe(
        (newPerson) => {
          this.showToastr.showSucces('Usuario registrado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Usuario', 'Creating');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedUsuario.id;
      console.log(data);
      this.usuarioService.editUsuario(data).subscribe(
        (newUsuario) => {
          this.showToastr.showSucces('Usuario actualizado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Usuario', 'Editing');
          this.spinner.hide();
        },
      );
    }
  }
}
