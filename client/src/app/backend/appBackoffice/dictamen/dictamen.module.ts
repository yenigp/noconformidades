import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminListDictamenComponent } from './list-dictamen/list-dictamen.component';
import { AdminDictamenRoutingModule } from './dictamen-routing.module';
import { DictamenTableComponent } from './list-dictamen/dictamen-table/dictamen-table.component';
import { DialogAddEditDictamenComponent } from './list-dictamen/dialog-add-edit-dictamen/dialog-add-edit-dictamen.component';
////////// --------MATERIAL MODULES------- /////////////////////////
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
///////////////////////////////////////////////////////////////////

@NgModule({
  imports: [
    CommonModule,
    AdminDictamenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatBadgeModule,
    MatChipsModule,
    MatTooltipModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,

    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTableExporterModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [AdminListDictamenComponent, DictamenTableComponent, DialogAddEditDictamenComponent],
})
export class AdminDictamenModule {}
