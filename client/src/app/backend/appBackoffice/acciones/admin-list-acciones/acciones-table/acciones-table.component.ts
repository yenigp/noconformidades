import { AccionesService } from '../../../../services/acciones/acciones.service';
import { IPagination } from 'src/app/core/classes/pagination.class';

import { debounceTime, filter } from 'rxjs/operators';

import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { StateCreatingAccionesService } from '../../../../services/state-creating-acciones/state-creating-acciones.service';

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
import { TareasService } from 'src/app/backend/services/tareas/tareas.service';

@Component({
  selector: 'app-acciones-table',
  templateUrl: './acciones-table.component.html',
  styleUrls: ['./acciones-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AccionesTableComponent implements OnInit {
  @Input() role;
  urlImage: string;
  innerWidth: any;
  applyStyle = false;
  allTareas: any[] = [];
  allAcciones: any[] = [];
  searchForm: FormGroup;
  expandedElement: false;
  dataSource: MatTableDataSource<any>;
  showFilterAcciones: boolean;
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
    order: 'createdAt',
    page: 1,
    filter: { filterText: '', properties: [] },
  };

  //////////////////////////////////////////

  displayedColumns: string[] = [
    'select',
    'createdAt',
    'codigo',
    'TipoId',
    'AccionTomar',
    'estado',
    'FechaCumplimiento',
    'actions',
  ];
  pageSizeOptions: number[] = [10, 25, 100, 1000];
  searchElementCount = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
    private accionesService: AccionesService,
    private stateCreatingAccionesService: StateCreatingAccionesService,
    private tareasService: TareasService,
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
    this.tareasService.getAllTareas().subscribe((data) => {
      this.allTareas = data.data;
    });
  }

  refreshData(): void {
    this.accionesService.getAllAcciones({ limit: 0, offset: 0 }, { role: this.role }).subscribe(
      (data) => {
        console.log(data);
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
    this.allAcciones = data;
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
    this.showFilterAcciones = true;
  }

  hideSearchForm() {
    this.showFilterAcciones = false;
    this.searchForm.controls['textCtrl'].setValue('');
  }

  filterADByCode(code: string) {
    let temp = this.allAcciones.filter(
      (acciones) =>
        acciones.nombre.toLowerCase().indexOf(code.toLowerCase()) >= 0 ||
        (acciones.descripcion && acciones.descripcion.toLowerCase().indexOf(code.toLowerCase()) >= 0) ||
        (acciones.FechaComienzo && acciones.FechaComienzo.toLowerCase().indexOf(code.toLowerCase()) >= 0) ||
        (acciones.FechaFin && acciones.FechaFin.toLowerCase().indexOf(code.toLowerCase()) >= 0),
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

  onEditAcciones(acciones): void {
    this.router.navigate(['/backend/acciones/edit'], {
      queryParams: { AccionesId: acciones.id },
    });
  }

  async onRemoveAcciones(acciones) {
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
          const data = await Promise.all(acciones.map((item) => this.accionesService.removeAcciones(item)));
          this.showToastr.showSucces('Acciones eliminadas satisfactoriamente', 'Succes', 7500);
          this.refreshData();
        }
      } catch (error) {
        this.utilsService.errorHandle(error);
        this.refreshData();
      }
    });
  }
}
