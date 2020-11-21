import { NoConformidadService } from '../../../../services/noconformidad/noconformidad.service';
import { IPagination } from 'src/app/core/classes/pagination.class';

import { debounceTime, filter } from 'rxjs/operators';

import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { StateCreatingNoConformidadService } from '../../../../services/state-creating-noconformidad/state-creating-noconformidad.service';

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

@Component({
  selector: 'app-noconformidad-table',
  templateUrl: './noconformidad-table.component.html',
  styleUrls: ['./noconformidad-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NoConformidadTableComponent implements OnInit {
  @Input() role;
  urlImage: string;
  innerWidth: any;
  applyStyle = false;
  allNoConformidad: any[] = [];
  searchForm: FormGroup;
  expandedElement: false;
  dataSource: MatTableDataSource<any>;
  showFilterNoConformidad: boolean;
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
    'ProcesoId',

    'NormaId',

    'codigo',

    'TipoId',

    'resultado',

    'status',

    'gravedad',

    //'FechaIdentificacion',

    //'AreaId',

    //'SucursalId',

    'actions',
  ];
  pageSizeOptions: number[] = [10, 25, 100, 1000];
  searchElementCount = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
    private noconformidadService: NoConformidadService,
    private stateCreatingNoConformidadService: StateCreatingNoConformidadService,
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
      const data = this.allNoConformidad;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  refreshData(): void {
    this.noconformidadService.getAllNoConformidad({ limit: 0, offset: 0 }, { role: this.role }).subscribe(
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
    this.allNoConformidad = data;
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
    this.showFilterNoConformidad = true;
  }

  hideSearchForm() {
    this.showFilterNoConformidad = false;
    this.searchForm.controls['textCtrl'].setValue('');
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

  onEditNoConformidad(noconformidad): void {
    // this.noconformidadService.getNoConformidad(noconformidad).subscribe(
    //   data => {
    //     console.log('Vamos a editar la no conformidad::', data.data.id);
    //     this.stateCreatingNoConformidadService.setNoConformidadCreated(data.data);
    this.router.navigate(['/backend/noconformidad/edit'], { queryParams: { NoConformidadId: noconformidad.id } });
    //   },
    //   err => {
    //     this.utilsService.errorHandle(err, 'NoConformidad', 'Listando');
    //   }
    // );
  }

  async onRemoveNoConformidad(noconformidad) {
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
          const data = await Promise.all(
            noconformidad.map((item) => this.noconformidadService.removeNoConformidad(item)),
          );
          this.showToastr.showSucces('No conformidad eliminada satisfactoriamente', 'Succes', 7500);
          this.refreshData();
        }
      } catch (error) {
        this.utilsService.errorHandle(error);
        this.refreshData();
      }
    });
  }
}
