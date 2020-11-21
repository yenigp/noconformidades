import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { TipoNCService } from 'src/app/backend/services/tiponc/tiponc.service';

@Component({
  selector: 'app-dialog-add-edit-tiponc',
  templateUrl: './dialog-add-edit-tiponc.component.html',
  styleUrls: ['./dialog-add-edit-tiponc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditTipoNCComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedTipoNC: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditTipoNCComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private tiponcService: TipoNCService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedTipoNC = data.selectedTipoNC;
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
          this.selectedTipoNC && this.selectedTipoNC.codigo ? this.selectedTipoNC.codigo : null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[A-Z]*')],
        ],
        nombre: [
          this.selectedTipoNC && this.selectedTipoNC.nombre ? this.selectedTipoNC.nombre : null,
          [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
        ],
      });
    } else {
      this.form = this.fb.group({
        codigo: [
          null,
          [Validators.required, Validators.minLength(2), Validators.maxLength(2), Validators.pattern('[A-Z]*')],
        ],
        nombre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    //console.log(data);
    if (!this.isEditing) {
      this.tiponcService.createTipoNC(data).subscribe(
        (newTipoNC) => {
          this.showToastr.showSucces('Tipo de no conformidad registrada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Tipo de no conformidad', 'Creando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedTipoNC.id;
      console.log(data);
      this.tiponcService.editTipoNC(data).subscribe(
        (newTipoNC) => {
          this.showToastr.showSucces('Tipo de no conformidad actualizada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Tipo de no conformidad', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
