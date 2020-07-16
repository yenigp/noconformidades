import { EnterpriseService } from '../../../services/enterprise/enterprise.service';
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
  selector: 'app-dialog-edit-enterprises',
  templateUrl: './dialog-edit-enterprises.component.html',
  styleUrls: ['./dialog-edit-enterprises.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogEditEnterprisesComponent implements OnInit, OnDestroy {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  _unsubscribeAll: Subject<any>;
  selectedEnterprise = null;
  currentIndex = 20;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEditEnterprisesComponent>,
    private loggedInUserEnterprise: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showTeastr: ShowToastrService,
    private ourEnterprises: EnterpriseService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserEnterprise.getLoggedInUser();
    this._unsubscribeAll = new Subject<any>();

    this.isEditing = data.isEditing;
    this.selectedEnterprise = data.selectedEnterprise;
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


  //---------------IMAGEN---------


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
        name: [
          this.selectedEnterprise && this.selectedEnterprise.name ? this.selectedEnterprise.name : null,
          [Validators.required],
        ],
        description: [
          this.selectedEnterprise && this.selectedEnterprise.description ? this.selectedEnterprise.description : null,
          [],
        ],
      });
    } else {
      this.form = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, []],
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
      data.image = this.imageBrand;
    }

    if (!this.isEditing) {
      this.ourEnterprises.createEnterprise(data).subscribe(
        () => {
          this.showTeastr.showSucces('Objecto creado correctamente');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        error => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Empresa', 'Creating');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedEnterprise.id;
      this.ourEnterprises.editEnterprise(data).subscribe(
        () => {
          this.showTeastr.showSucces('Updated empresa successfully');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        error => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Empresa', 'Editing');
          this.spinner.hide();
        },
      );
    }
  }

  //////////////////////////////////////////
}
