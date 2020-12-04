import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { environment } from 'src/environments/environment';
import { RolesService } from 'src/app/backend/services/roles/roles.service';
import { SucursalService } from 'src/app/backend/services/sucursal/sucursal.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { UserService } from 'src/app/backend/services/user/user.service';

@Component({
  selector: 'app-dialog-add-edit-user',
  templateUrl: './dialog-add-edit-user.component.html',
  styleUrls: ['./dialog-add-edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditUserComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedUser: any;
  loadImage = false;
  imageAvatarChange = false;
  showErrorImage = false;
  urlImage = 'data:image/jpeg;base64,';
  base64textString = null;
  imageAvatar = null;
  innerWidth: any;
  applyStyle = false;
  passwordType = 'password';
  form: FormGroup;
  formPass: FormGroup;
  isChangePass = false;
  role: any;
  sucursal: any;
  Roles: any[] = [];
  Sucursal: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditUserComponent>,
    private loggedInUserService: LoggedInUserService,
    private rolesService: RolesService,
    private sucursalService: SucursalService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private userService: UserService,
  ) {
    this.urlImage = environment.apiUrl;
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.role = data.role;
    this.sucursal = data.sucursal;
    this.selectedUser = data.selectedUser;
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
    this.rolesService.getAllRoles().subscribe((data) => {
      this.Roles = data.data;
    });
    this.sucursalService.getAllSucursal().subscribe((data) => {
      this.Sucursal = data.data;
    });
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        nombre: [
          this.selectedUser && this.selectedUser.nombre ? this.selectedUser.nombre : null,
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(2),
            Validators.pattern('^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$'),
          ],
        ],
        apellidos: [
          this.selectedUser && this.selectedUser.apellidos ? this.selectedUser.apellidos : null,
          [
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(2),
            Validators.pattern('^(?=.{3,50}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$'),
          ],
        ],
        email: [
          this.selectedUser && this.selectedUser.email ? this.selectedUser.email : null,
          [Validators.required, Validators.email],
        ],
        status: [this.selectedUser && this.selectedUser.status ? this.selectedUser.status : null],
        RolId: [this.selectedUser && this.selectedUser.RolId ? this.selectedUser.RolId : null, [Validators.required]],
        description: [this.selectedUser && this.selectedUser.description ? this.selectedUser.description : null],
      });
      console.log(this.form);
    } else {
      this.formPass = this.fb.group(
        {
          password: [null, [Validators.required]],
          repeat: [null, [Validators.required]],
        },
        { validator: this.matchValidator.bind(this) },
      );
      this.form = this.fb.group({
        nombre: [
          null,
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(2),
            Validators.pattern('^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$'),
          ],
        ],
        apellidos: [
          null,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(2),
            Validators.pattern('^(?=.{3,50}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$'),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        usuario: [
          null,
          [Validators.required, Validators.maxLength(10), Validators.minLength(2), Validators.pattern('^[a-z{10}]*$')],
        ],
        RolId: [null, [Validators.required]],
        SucursalId: [null, [Validators.required]],
        status: [null],
        description: [null],
        password: this.formPass,
      });
    }
    console.log(this.form);
  }

  ngOnDestroy(): void {}

  matchValidator(group: FormGroup) {
    const pass = group.controls['password'].value;
    const repeat = group.controls['repeat'].value;
    if (pass === repeat && pass && repeat && pass !== '') {
      return null;
    }
    return {
      mismatch: true,
    };
  }

  onSelectSliderChange(event) {
    if (this.isChangePass) {
      this.isChangePass = false;
      this.form.removeControl('password');
    } else {
      this.isChangePass = true;
      this.formPass = this.fb.group(
        {
          password: [null, [Validators.required]],
          repeat: [null, [Validators.required]],
        },
        { validator: this.matchValidator.bind(this) },
      );
      this.form.addControl('password', this.formPass);
    }
    this.form.updateValueAndValidity();
  }

  /////////////////////////////////////

  openFileBrowser(event) {
    event.preventDefault();

    const element: HTMLElement = document.getElementById('filePicker') as HTMLElement;
    element.click();
  }

  //////////////////////////////////////////

  onUpdateProfile(): void {
    this.spinner.show();
    const data = this.form.value;
    if (this.imageAvatarChange) {
      data.avatar = this.imageAvatar;
    }
    if (!this.isEditing) {
      if (data.status == false) {
        data.status = 'blocked';
      }
      if (data.status == true) {
        data.status = 'enabled';
      }
      data.password = this.formPass.value.password;
      this.userService.createUser(data).subscribe(
        (newProfile) => {
          this.showToastr.showSucces('Usuario creado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Usuario', 'Agregando');
          this.spinner.hide();
        },
      );
    } else {
      if (data.status == false) {
        data.status = 'blocked';
      }
      if (data.status == true) {
        data.status = 'enabled';
      }
      data.id = this.selectedUser.id;
      console.log(data);
      this.userService.editUser(data).subscribe(
        (newProfile) => {
          if (newProfile.id === this.loggedInUser.id) {
            this.loggedInUserService.setNewProfile(newProfile.data);
          }
          this.showToastr.showSucces('Perfil actualizado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Usuario', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
