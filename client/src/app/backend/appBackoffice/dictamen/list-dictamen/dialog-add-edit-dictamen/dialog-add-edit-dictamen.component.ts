import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { DictamenService } from 'src/app/backend/services/dictamen/dictamen.service';
import { QuejasReclamacionesService } from 'src/app/backend/services/quejasreclamaciones/quejasreclamaciones.service';

@Component({
  selector: 'app-dialog-add-edit-dictamen',
  templateUrl: './dialog-add-edit-dictamen.component.html',
  styleUrls: ['./dialog-add-edit-dictamen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditDictamenComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedDictamen: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  QuejasReclamaciones: any[] = [];
  estado: any[] = ['aprobado', 'denegado'];
  maxDate: Date;
  minDate: Date;
  hide = true;
  checked = false;
  disabled = false;
  myFilter = function (d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditDictamenComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private dictamenService: DictamenService,
    private quejasreclamacionesService: QuejasReclamacionesService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedDictamen = data.selectedDictamen;
    this.minDate = new Date(new Date().setDate(new Date().getDate() - 5));
    this.maxDate = new Date();
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

  //////////////////////////////////////////

  /////////////////////////////////////////

  ngOnInit(): void {
    this.createForm();
    this.quejasreclamacionesService.getAllQuejasReclamaciones().subscribe((data) => {
      this.QuejasReclamaciones = data.data;
    });
  }

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        codigo: [this.selectedDictamen && this.selectedDictamen.codigo ? this.selectedDictamen.codigo : null],
        QuejasReclamacionesId: [
          this.selectedDictamen && this.selectedDictamen.QuejasReclamacionesId
            ? this.selectedDictamen.QuejasReclamacionesId
            : null,
          [Validators.required],
        ],
        estado: [
          this.selectedDictamen && this.selectedDictamen.estado ? this.selectedDictamen.estado : null,
          [Validators.required],
        ],
        FechaAprobacion: [
          this.selectedDictamen && this.selectedDictamen.FechaAprobacion ? this.selectedDictamen.FechaAprobacion : null,
          [Validators.required],
        ],
        conclusiones: [
          this.selectedDictamen && this.selectedDictamen.conclusiones ? this.selectedDictamen.conclusiones : null,
          [Validators.required],
        ],
      });
    } else {
      this.form = this.fb.group({
        QuejasReclamacionesId: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        FechaAprobacion: [null, [Validators.required]],
        conclusiones: [null, [Validators.required]],
      });
    }
  }

  ngOnDestroy(): void {}

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.dictamenService.createDictamen(data).subscribe(
        (newdictamen) => {
          this.showToastr.showSucces('Dictamen registrado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Dictamen', 'Registrando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedDictamen.id;
      console.log(data);
      this.dictamenService.editDictamen(data).subscribe(
        (newdictamen) => {
          this.showToastr.showSucces('Dictamen actualizado satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Dictamen', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }
}
