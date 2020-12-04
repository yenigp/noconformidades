import { IncidenciaService } from '../../../../services/incidencia/incidencia.service';
import { IPagination } from 'src/app/core/classes/pagination.class';

import { debounceTime, filter } from 'rxjs/operators';

import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { StateCreatingIncidenciaService } from '../../../../services/state-creating-incidencia/state-creating-incidencia.service';

import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/backend/common-dialogs-module/confirmation-dialog/confirmation-dialog.component';
import { IUser } from 'src/app/core/classes/user.class';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { Router } from '@angular/router';
import { CdkTableExporterModule } from 'cdk-table-exporter';

@Component({
  selector: 'app-incidencia-table',
  templateUrl: './incidencia-table.component.html',
  styleUrls: ['./incidencia-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IncidenciaTableComponent implements OnInit {
  @Input() role;
  urlImage: string;
  innerWidth: any;
  applyStyle = false;
  allIncidencia: any[] = [];
  searchForm: FormGroup;
  expandedElement: false;
  title = 'Registro de Incidencias';
  dataSource: MatTableDataSource<any>;
  showFilterIncidencia: boolean;
  loggedInUser: IUser;
  loading = false;
  _unsubscribeAll: Subject<any>;
  selection: SelectionModel<any>;
  showActionsBtn = false;
  ////////////////////Pagination Structure/////////////////////
  query: IPagination = {
    limit: 0,
    total: 0,
    offset: 0,
    order: 'FechaRegistro',
    page: 1,
    filter: { filterText: '', properties: [] },
  };

  //////////////////////////////////////////

  displayedColumns: string[] = [
    'select',
    'FechaRegistro',
    'codigo',
    'Incidencia.tipo',
    'ProcesoId',
    'NormaId',
    'Incidencia.CausaInvestigacion',
    'status',
    'actions',
  ];
  pageSizeOptions: number[] = [10, 25, 100, 1000];
  searchElementCount = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
    private incidenciaService: IncidenciaService,
    private stateCreatingIncidenciaService: StateCreatingIncidenciaService,
    private router: Router,
    public dialog: MatDialog,
    private utilsService: UtilsService,
    private showToastr: ShowToastrService,
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.selection = new SelectionModel<any>(true, []);
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }

  ngOnInit() {
    this.refreshData();
    this.createSearchForm();

    this.searchForm.valueChanges.subscribe((val) => {
      const data = this.filterADByCode(val.textCtrl);
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  refreshData(): void {
    this.incidenciaService.getAllIncidencia({ limit: 0, offset: 0 }, { role: this.role }).subscribe(
      (data) => {
        this.initTable(data.data);
        this.searchElementCount = data.meta.total;
        this.selection.clear();
      },
      (error) => {
        this.utilsService.errorHandle(error);
        this.selection.clear();
      },
    );
  }

  initTable(data) {
    this.allIncidencia = data;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      textCtrl: ['', [Validators.required]],
    });
  }

  showSearchForm() {
    this.showFilterIncidencia = true;
  }

  hideSearchForm() {
    this.showFilterIncidencia = false;
    this.searchForm.controls['textCtrl'].setValue('');
  }

  filterADByCode(code: string) {
    let temp = this.allIncidencia.filter(
      (incidencia) =>
        incidencia.codigo.toLowerCase().indexOf(code.toLowerCase()) >= 0 ||
        (incidencia.Proceso.codigo && incidencia.Proceso.codigo.toLowerCase().indexOf(code.toLowerCase()) >= 0) ||
        (incidencia.Norma.nombre && incidencia.Norma.nombre.toLowerCase().indexOf(code.toLowerCase()) >= 0) ||
        (incidencia.Incidencia.tipo && incidencia.Incidencia.tipo.toLowerCase().indexOf(code.toLowerCase()) >= 0),
    );
    this.searchElementCount = temp.length;
    return temp;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 600) {
      this.applyStyle = false;
    } else {
      this.applyStyle = true;
    }
  }

  ///////Select logic/////////////////

  getBody(element) {
    if (element.body) {
      if (element.body.constructor == String) {
        return JSON.parse(element.body);
      } else {
        return element.body;
      }
    } else {
      return {};
    }
  }

  getQuery(element) {
    if (element.query) {
      if (element.query.constructor == String) {
        return JSON.parse(element.query);
      } else {
        return element.query;
      }
    } else {
      return {};
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onEditIncidencia(incidencia): void {
    this.router.navigate(['/backend/incidencia/edit'], {
      queryParams: { IncidenciaId: incidencia.Incidencia.id },
    });
  }

  async onRemoveIncidencia(incidencia) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmación',
        question: '¿Está seguro que desea eliminar?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      try {
        if (result) {
          const data = await Promise.all(incidencia.map((item) => this.incidenciaService.removeIncidencia(item)));
          this.showToastr.showSucces('Incidencia eliminada satisfactoriamente', 'Succes', 7500);
          this.refreshData();
        }
      } catch (error) {
        this.utilsService.errorHandle(error);
        this.refreshData();
      }
    });
  }
}
