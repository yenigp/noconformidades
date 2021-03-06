import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  question = '';
  isSaving = false;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    this.dialogRef
      .backdropClick()
      .subscribe(() => {
        if (!this.isSaving) {
          this.dialogRef.close();
        }
      });
  }

  onSave() {
    this.isSaving = true;
    this.dialogRef.close(true);
  }

}
