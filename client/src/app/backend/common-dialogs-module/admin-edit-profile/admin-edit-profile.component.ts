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
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';

@Component({
  selector: 'app-admin-edit-profile',
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEditProfileComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AdminEditProfileComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private authService: AuthenticationService,
    private showToatr: ShowToastrService
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

      gitUser: [
        this.loggedInUser && this.loggedInUser.gitUser
          ? this.loggedInUser.gitUser
          : null,
        [Validators.required]
      ],
      email: [
        this.loggedInUser && this.loggedInUser.email
          ? this.loggedInUser.email
          : null,
        [Validators.required, Validators.email]
      ],
      password: this.formPass,

    });
  }

  ngOnDestroy(): void { }

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
        this.loggedInUserService.setNewProfile(newProfile.data);
        this.showToatr.showSucces('Profile updated successfully');
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
