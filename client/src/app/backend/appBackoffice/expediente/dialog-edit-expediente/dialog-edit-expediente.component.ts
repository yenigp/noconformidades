import { ExpedienteService } from '../../../services/expediente/expediente.service';
import {
  Component,
  Inject,
  HostListener,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from 'src/environments/environment';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';

@Component({
  selector: 'app-dialog-edit-expediente',
  templateUrl: './dialog-edit-expediente.component.html',
  styleUrls: ['./dialog-edit-expediente.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogEditExpedienteComponent implements OnInit, OnDestroy {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  _unsubscribeAll: Subject<any>;
  selectedExpediente = null;
  currentIndex = 20;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEditExpedienteComponent>,
    private loggedInUserExpediente: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showTeastr: ShowToastrService,
    private expedienteService: ExpedienteService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserExpediente.getLoggedInUser();
    this._unsubscribeAll = new Subject<any>();

    this.isEditing = data.isEditing;
    this.selectedExpediente = data.selectedExpediente;
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

  //---------------Evidencia---------

  showErrorImage = false;
  urlImage = 'url(data:image/jpeg;base64,';
  base64textString = null;
  imageBrand = null;
  loadImage = false;
  imageBrandChange = false;
  openFileBrowser(event) {
    event.preventDefault();

    const element: HTMLElement = document.getElementById('filePicker') as HTMLElement;
    element.click();
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];
    if (files[0].size < 500000) {
      if (files && file) {
        const reader = new FileReader();
        reader.onload = this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
    } else {
      this.showErrorImage = true;
    }
  }

  handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.urlImage = 'data:image/jpeg;base64,';
    this.imageBrand = this.urlImage + this.base64textString;
    this.loadImage = true;
    this.showErrorImage = false;
    this.imageBrandChange = true;
  }

  //////////////////////////////////////////

  createForm(): void {
    if (this.isEditing) {
      this.form = this.fb.group({
        NoConformidadId: [
          this.selectedExpediente && this.selectedExpediente.NoConformidadId
            ? this.selectedExpediente.NoConformidadId
            : null,
          [Validators.required],
        ],
        estado: [this.selectedExpediente && this.selectedExpediente.estado ? this.selectedExpediente.estado : null, []],
      });
    } else {
      this.form = this.fb.group({
        NoConformidadId: [null, [Validators.required]],
        estado: [null, []],
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSave(): void {
    this.spinner.show();
    let data = this.form.value;
    if (this.imageBrandChange) {
      data.evidencia = this.imageBrand;
    }

    if (!this.isEditing) {
      this.expedienteService.createExpediente(data).subscribe(
        () => {
          console.log(data);
          this.showTeastr.showSucces('Expediente creado correctamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Expediente', 'Agregando');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedExpediente.id;
      if (data.estado == false) {
        data.estado = 'cerrado';
      }
      if (data.estado == true) {
        data.estado = 'abierto';
      }
      console.log(data.id);
      this.expedienteService.editExpediente(data).subscribe(
        () => {
          this.showTeastr.showSucces('Actualizando expediente satisfactoriamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Expediente', 'Actualizando');
          this.spinner.hide();
        },
      );
    }
  }

  //////////////////////////////////////////
}
