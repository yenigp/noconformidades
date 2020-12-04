import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminListNoConformidadComponent } from './admin-list-noconformidad/admin-list-noconformidad.component';
import { AdminNoConformidadRoutingModule } from './noconformidad-routing.module';
import { NoConformidadTableComponent } from './admin-list-noconformidad/noconformidad-table/noconformidad-table.component';
import { CreateNoConformidadComponent } from './admin-list-noconformidad/noconformidad-create/noconformidad-create.component';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ArrayComponent } from './admin-list-noconformidad/array/array.component';
import { ResumenComponent } from './admin-list-noconformidad/resumen/resumen.component';
import { ReporteComponent } from './admin-list-noconformidad/reporte/reporte.component';
import { ChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
///////////////////////////////////////////////////////////////////

@NgModule({
  imports: [
    CommonModule,
    AdminNoConformidadRoutingModule,
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
    MatStepperModule,
    MatProgressBarModule,

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
    ChartsModule,
  ],
  declarations: [
    AdminListNoConformidadComponent,
    NoConformidadTableComponent,
    CreateNoConformidadComponent,
    ArrayComponent,
    ResumenComponent,
    ReporteComponent,
  ],
})
export class AdminNoConformidadModule {}
