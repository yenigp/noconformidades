import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
////////// --------MATERIAL MODULES------- /////////////////////////

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
///////////////////////////////////////////////////////////////////
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AdminEditProfileComponent } from './admin-edit-profile/admin-edit-profile.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,

    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  declarations: [ConfirmationDialogComponent, AdminEditProfileComponent],
  entryComponents: [ConfirmationDialogComponent, AdminEditProfileComponent],
  exports: [ConfirmationDialogComponent, AdminEditProfileComponent]
})
export class CommonDialogsModule {}
