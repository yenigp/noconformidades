import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { AreaService } from 'src/app/backend/services/area/area.service';
import { SucursalService } from 'src/app/backend/services/sucursal/sucursal.service';

@Component({
  selector: 'app-dialog-add-edit-area',
  templateUrl: './dialog-add-edit-area.component.html',
  styleUrls: ['./dialog-add-edit-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditAreaComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedArea: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  Sucursal: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditAreaComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private areaService: AreaService,
    private sucursalService: SucursalService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedArea = data.selectedArea;
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
    this.sucursalService.getAllSucursal().subscribe((data) => {
      this.Sucursal = data.data;
    });
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        nombre: [
          this.selectedArea && this.selectedArea.nombre ? this.selectedArea.nombre : null,
          [Validators.required],
        ],
        SucursalId: [
          this.selectedArea && this.selectedArea.SucursalId ? this.selectedArea.SucursaId : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        nombre: [null, [Validators.required]],
        SucursalId: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.areaService.createArea(data).subscribe(
        (newArea) => {
          this.showToastr.showSucces('Área registrada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Área', 'Creating');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedArea.id;
      console.log(data);
      this.areaService.editArea(data).subscribe(
        (newArea) => {
          this.showToastr.showSucces('Área actualizada satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Área', 'Editing');
          this.spinner.hide();
        },
      );
    }
  }
}
