import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminListIncidenciaComponent } from './admin-list-incidencia/admin-list-incidencia.component';
import { AdminIncidenciaRoutingModule } from './incidencia-routing.module';
import { IncidenciaTableComponent } from './admin-list-incidencia/incidencia-table/incidencia-table.component';
import { CreateIncidenciaComponent } from './admin-list-incidencia/incidencia-create/incidencia-create.component';
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
import { ArrayComponent } from './admin-list-incidencia/array/array.component';
import { ResumenComponent } from './admin-list-incidencia/resumen/resumen.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
///////////////////////////////////////////////////////////////////

@NgModule({
  imports: [
    CommonModule,
    AdminIncidenciaRoutingModule,
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
  ],
  declarations: [
    AdminListIncidenciaComponent,
    IncidenciaTableComponent,
    CreateIncidenciaComponent,
    ResumenComponent,
    ArrayComponent,
  ],
})
export class AdminIncidenciaModule {}
