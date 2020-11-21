import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NormaService } from 'src/app/backend/services/norma/norma.service';

@Component({
  selector: 'app-dialog-add-edit-norma',
  templateUrl: './dialog-add-edit-norma.component.html',
  styleUrls: ['./dialog-add-edit-norma.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditNormaComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedNorma: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditNormaComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private normaService: NormaService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedNorma = data.selectedNorma;
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
          this.selectedNorma && this.selectedNorma.nombre ? this.selectedNorma.nombre : null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern('[A-Z]{3}[ ][0-9,:]*'),
          ],
        ],
        status: [this.selectedNorma && this.selectedNorma.status ? this.selectedNorma.status : null],
      });
    } else {
      this.form = this.fb.group({
        nombre: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
            Validators.pattern('[A-Z]{3}[ ][0-9,:]*'),
          ],
        ],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    //console.log(data);
    if (!this.isEditing) {
      if (data.status == false) {
        data.status = 'blocked';
      }
      if (data.status == true) {
        data.status = 'enabled';
      }
      this.normaService.createNorma(data).subscribe(
        (newNorma) => {
          this.showToastr.showSucces('Norma registrada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Norma', 'Creando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedNorma.id;
      if (data.status == false) {
        data.status = 'blocked';
      }
      if (data.status == true) {
        data.status = 'enabled';
      }
      console.log(data);
      this.normaService.editNorma(data).subscribe(
        (newNorma) => {
          this.showToastr.showSucces('Norma actualizada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Norma', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
