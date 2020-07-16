import { Component, Inject, HostListener, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { ProjectService } from 'src/app/backend/services/project/project.service';

@Component({
  selector: 'app-dialog-add-edit-project',
  templateUrl: './dialog-add-edit-project.component.html',
  styleUrls: ['./dialog-add-edit-project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogAddEditProjectComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  loggedInUser: any;
  selectedProject: any;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  types: any[] = ['api', 'client', 'app', 'extra'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogAddEditProjectComponent>,
    private loggedInUserService: LoggedInUserService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
    private projectService: ProjectService,
  ) {
    this.dialogRef.disableClose = true;
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();

    this.isEditing = data.isEditing;
    this.selectedProject = data.selectedProject;
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
        name: [this.selectedProject && this.selectedProject.name ? this.selectedProject.name : null, [Validators.required]],
        git: [this.selectedProject && this.selectedProject.git ? this.selectedProject.git : null, [Validators.required]],
        type: [this.selectedProject && this.selectedProject.type ? this.selectedProject.type : null, [Validators.required]],
        description: [this.selectedProject && this.selectedProject.description ? this.selectedProject.description : null,],
      });
    } else {

      this.form = this.fb.group({
        name: [null, [Validators.required]],
        git: [null, [Validators.required]],
        type: [null, [Validators.required]],
        description: [null],
      });
    }
  }

  ngOnDestroy(): void { }

  onSaveAction(): void {
    this.spinner.show();
    const data = this.form.value;
    if (!this.isEditing) {
      this.projectService.createProject(data).subscribe(
        (newProject) => {
          this.showToastr.showSucces('Project successfully created');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Project', 'Creating');
          this.spinner.hide();
        },
      );
    } else {
      data.id = this.selectedProject.id;
      console.log(data);
      this.projectService.editProject(data).subscribe(
        (newProject) => {
          this.showToastr.showSucces('Project updated successfully');
          this.spinner.hide();
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
          this.utilsService.errorHandle(error, 'Project', 'Editing');
          this.spinner.hide();
        },
      );
    }
  }
}
