import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog-front',
  templateUrl: './confirmation-dialog-front.component.html',
  styleUrls: ['./confirmation-dialog-front.component.scss'],
})
export class ConfirmationDialogFrontComponent implements OnInit {
  question = '';
  isSaving = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogFrontComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.dialogRef.backdropClick().subscribe(() => {
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
