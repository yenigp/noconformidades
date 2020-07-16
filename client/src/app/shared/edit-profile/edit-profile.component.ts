import { ShowToastrService } from './../../core/services/show-toastr/show-toastr.service';

import {
  Component,
  Inject,
  HostListener,
  ViewEncapsulation,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupName
} from '@angular/forms';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  innerWidth: any;
  applyStyle = false;
  urlImage: any = '';
  loggedInUser: any;
  passwordType = 'password';
  form: FormGroup;
  formPass: FormGroup;
  defaultImage: '../../../../assets/images/avatars/profile2.png';
  isChangePass = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showSnackbar: ShowToastrService,
    private authService: AuthenticationService
  ) {
    this.urlImage = environment.apiUrl;
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
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
    this.form = this.fb.group({
      name: [
        this.loggedInUser && this.loggedInUser.name
          ? this.loggedInUser.name
          : null,
        [Validators.required]
      ],
      username: [
        this.loggedInUser && this.loggedInUser.username
          ? this.loggedInUser.username
          : null,
        [Validators.required]
      ],
      lastName: [
        this.loggedInUser && this.loggedInUser.lastName
          ? this.loggedInUser.lastName
          : null,
        [Validators.required]
      ],
      address: [
        this.loggedInUser && this.loggedInUser.address
          ? this.loggedInUser.address
          : null,
        []
      ],
      phone: [
        this.loggedInUser && this.loggedInUser.phone
          ? this.loggedInUser.phone
          : null,
        []
      ],
      email: [
        this.loggedInUser && this.loggedInUser.email
          ? this.loggedInUser.email
          : null,
        [Validators.required, Validators.email]
      ],
      password: this.formPass,
      description: [
        this.loggedInUser && this.loggedInUser.description
          ? this.loggedInUser.description
          : null
      ]
    });
  }

  ngOnDestroy(): void {}

  matchValidator(group: FormGroup) {
    const pass = group.controls['password'].value;
    const repeat = group.controls['repeat'].value;
    if (pass === repeat && pass && repeat && pass !== '') {
      return null;
    }
    return {
      mismatch: true
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
          repeat: [null, [Validators.required]]
        },
        { validator: this.matchValidator.bind(this) }
      );
      this.form.addControl('password', this.formPass);
    }
    this.form.updateValueAndValidity();
  }

  onUpdateProfile(): void {
    const data = this.form.value;
    if (this.isChangePass) {
      data.password = this.formPass.value.password;
    } else {
      delete data.password;
    }
    // data.id = this.loggedInUser.id;
    this.spinner.show();
    this.authService.editProfile(data).subscribe(
      newProfile => {
        console.log('TCL: EditProfileComponent -> newProfile', newProfile);
        this.loggedInUserService.setNewProfile(newProfile.data);
        this.showSnackbar.showSucces('Profile updated successfully');
        this.spinner.hide();
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
        this.utilsService.errorHandle(error, 'User', 'Editing');
        this.spinner.hide();
      }
    );
  }
}
