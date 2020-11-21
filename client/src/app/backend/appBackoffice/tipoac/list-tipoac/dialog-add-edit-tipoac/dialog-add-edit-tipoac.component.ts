import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { TipoACService } from 'src/app/backend/services/tipoac/tipoac.service';

@Component({
  selector: 'app-dialog-add-edit-tipoac',
  templateUrl: './dialog-add-edit-tipoac.component.html',
  styleUrls: ['./dialog-add-edit-tipoac.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditTipoACComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedTipoAC: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditTipoACComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private tipoacService: TipoACService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedTipoAC = data.selectedTipoAC;
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
        codigo: [
          this.selectedTipoAC && this.selectedTipoAC.codigo ? this.selectedTipoAC.codigo : null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[A-Z]*')],
        ],
        nombre: [
          this.selectedTipoAC && this.selectedTipoAC.nombre ? this.selectedTipoAC.nombre : null,
          [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        ],
      });
    } else {
      this.form = this.fb.group({
        codigo: [
          null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[A-Z]*')],
        ],
        nombre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    //console.log(data);
    if (!this.isEditing) {
      this.tipoacService.createTipoAC(data).subscribe(
        (newTipoAC) => {
          this.showToastr.showSucces('Tipo de acciones registrada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Tipo de acciones', 'Creando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedTipoAC.id;
      console.log(data);
      this.tipoacService.editTipoAC(data).subscribe(
        (newTipoAC) => {
          this.showToastr.showSucces('Tipo de acciones actualizada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Tipo de acciones', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
