
import { Component, OnInit, ViewChild, HostListener, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from 'src/app/core/classes/user.class';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { IPagination } from 'src/app/core/classes/pagination.class';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { BreadcrumbService } from 'src/app/backend/common-layout-components/breadcrumd/service/breadcrumb.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/backend/common-dialogs-module/confirmation-dialog/confirmation-dialog.component';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { Subject } from 'rxjs';
// import { DialogEditHospitalsComponent } from '../dialog-edit-hospitals/dialog-edit-hospitals.component';
import { LogsService } from 'src/app/backend/services/logs/logs.service';

@Component({
  selector: 'app-admin-log-table',
  templateUrl: './admin-log-table.component.html',
  styleUrls: ['./admin-log-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminLogTableComponent implements OnInit, OnDestroy {
  _unsubscribeAll = new Subject<any>();
  searchFilters: any;
  showFilterClient: boolean;
  isLoading: boolean;
  innerWidth: any;
  searchForm: FormGroup;
  formFilters: FormGroup;
  expandedElement: false;
  allData: any[] = [];
  displayedColumns: string[] = ['url', 'method', 'error', 'statusCode', 'username', 'PersonId', 'cargo', 'timestamp'];
  dataSource = new MatTableDataSource<any>([]);
  pageSizeOptions: number[] = [10, 15, 25, 50, 100];
  selection = new SelectionModel<any>(true, []);
  selectedId: number;
  selectedData: any;
  loggedInUser: IUser;
  running = false;
  maxDate = new Date();
  pageEvent: PageEvent;
  applyStyle = false;

  Roles = [
    {
      label: 'Admin',
      value: "admin"
    },
    {
      label: 'Programador',
      value: 'programador'
    }
  ];

  query: IPagination = {
    limit: 10,
    total: 0,
    offset: 0,
    order: '-timestamp',
    page: 1,
    filter: null
  };

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 600) {
      this.applyStyle = false;
    } else {
      this.applyStyle = true;
    }
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(row) {
    this.selection.clear();
    if (this.selectedId !== row.id) {
      this.selectedId = row.id;
      this.selectedData = row;
      this.selection.select(row);
    } else {
      this.selectedId = null;
      this.selectedData = null;
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  showSearchForm() {
    this.showFilterClient = true;
  }


  onInitTable(data) {
    if (data.length > 100) {
      this.pageSizeOptions = [10, 15, 25, 50, 100, data.length];
    } else {
      this.pageSizeOptions = [10, 15, 25, 50, 100];
    }
    this.allData = data;
    this.dataSource = new MatTableDataSource<IUser>(data);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private loggedInUserService: LoggedInUserService,
    private elementService: LogsService,
    private breadcrumbService: BreadcrumbService) {

    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Listado de Logs', true);

    const $this = this;
    this.createSearchForm();

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(val => {

        if (val.textCtrl.length !== 0) {
          if (val.textCtrl.toString().trim() !== '') {
            this.query.filter = {
              filterText: val.textCtrl.toString().trim(),
              properties: []
            };
            this.onFilterData();
            this.paginator.firstPage();
          }
        } else {
          this.query = {
            limit: 10,
            total: 0,
            offset: 0,
            order: '-timestamp',
            page: 1,
            filter: null
          };
          this.onFilterData();
          this.paginator.firstPage();
        }
      });
  }

  onChangeFilterInput() {
    const val = this.searchForm.value;
    if ((val.textCtrl) && (val.textCtrl !== '')) {
      this.query.filter = {
        filterText: val.textCtrl,
        properties: []
      };

      this.query.filter.properties.push('filter[$or][name][$like]');

      this.onFilterData();
    }
  }

  createSearchForm() {
    let startDate = new Date();
    let endDate = new Date();
    startDate.setTime(endDate.getTime() - (24 * 60 * 60 * 1000));

    this.searchForm = this.fb.group({
      textCtrl: ['', [Validators.required]]
    });
    this.formFilters = this.fb.group({
      url: [null, []],
      user: [null, []],
      stringUser: [null, []],
      statusCode: [null, []],
      cargo: [null, []],
      method: [null, []],
      startDate: [startDate],
      endDate: [endDate]
    });
  }


  onStringSelectElement($event) {
    if ($event) {
      this.formFilters.get('stringUser').setValue($event);
    } else {
      this.formFilters.get('stringUser').setValue(null);
    }
  }

  onInitPagination(meta) {
    this.query.page = 1;
    this.query.total = meta.pagination.total;
  }

  refreshPaginationFromEvent(event: PageEvent) {
    if (event) {
      this.query.limit = event.pageSize || 10;
      this.query.offset = event.pageIndex * event.pageSize;
      this.query.page = event.pageIndex;
    } else {
      this.query.limit = 10;
      this.query.offset = 0;
      this.query.page = 1;
    }
  }

  ngOnInit() {
    const $this = this;
    const query: IPagination = {
      limit: 10,
      total: 0,
      offset: 0,
      order: '-timestamp',
      page: 1,
      filter: null
    };

    this.elementService.getAllLogs(this.query, this.searchFilters).subscribe(data => {
      this.onInitPagination(data.meta);
      this.onInitTable(data.data);
    });

    this.innerWidth = window.innerWidth;

  }

  onRefresh() {
    this.selection.clear();
    if (this.query.offset) {
      this.paginator.firstPage();
    } else {
      this.onRefreshData();
    }
  }

  getCargo(cargo) {
    switch (cargo) {
      case 'admin':
        return 'Admin';
        break;

      case 'programador':
        return 'Programador';
        break;

      default:
        return '';
        break;
    }
  }

  buscarLogs() {
    this.searchFilters = this.formFilters.value;
    console.log(this.searchFilters);
    this.onFilterData();
    this.paginator.firstPage();
  }

  limpiarLogs() {

    this.formFilters.get('user').setValue(null);
    this.formFilters.get('stringUser').setValue(null);
    this.formFilters.get('cargo').setValue(null);
    this.formFilters.get('method').setValue(null);
    this.formFilters.get('url').setValue(null);
    this.formFilters.get('statusCode').setValue(null);
    let endDate = new Date();
    let startDate = new Date();
    startDate.setTime(endDate.getTime() - (24 * 60 * 60 * 1000));
    this.formFilters.get('startDate').setValue(startDate);
    this.formFilters.get('endDate').setValue(endDate);

    this.searchFilters = this.formFilters.value;
    this.onFilterData();
    this.paginator.firstPage();
  }

  onRefreshData() {
    this.refreshPaginationFromEvent(null);
    this.elementService.getAllLogs(this.query, this.searchFilters).subscribe(val => {
      this.onInitPagination(val.meta);
      this.dataSource = new MatTableDataSource<any>(val.data);
    });
  }

  onFilterData() {
    this.isLoading = true;
    this.refreshPaginationFromEvent(this.pageEvent);
    this.elementService.getAllLogs(this.query, this.searchFilters).subscribe(
      val => {
        this.onInitPagination(val.meta);
        this.dataSource = new MatTableDataSource<any>(val.data);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  hideSearchForm() {
    this.showFilterClient = false;
    this.searchForm.controls['textCtrl'].setValue('');
    this.query.filter = null;
    this.onRefresh();
  }

  onPaginateData(event?: PageEvent) {

    this.pageEvent = event;

    this.onFilterData();

    return event;
  }

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

  sortData(sort: Sort) {
    let columnName: string;
    switch (sort.active) {
      case 'name':
        columnName = 'name';
        break;
      case 'status':
        columnName = sort.active;
        break;
      case 'createdAt':
        columnName = sort.active;
        break;
      case 'description':
        columnName = 'description';
        break;
      default:
        columnName = sort.active;
    }
    if (sort.direction === 'desc') {
      this.query.order = '-' + columnName;
    } else {
      this.query.order = columnName;
    }
    this.onFilterData();
    this.paginator.firstPage();
  }

  returnData(transactions: any[]): any[] {
    const data: any[] = [];
    transactions.forEach(item => {
      if (item.Provincia != undefined) {
        item.Provincia = item.Provincia.nombre;
      }
      if (item.Municipio != undefined) {
        item.Municipio = item.Municipio.nombre;
      }
      delete item.image;
      delete item.updateAt;
      delete item.deleteAt;
      delete item.timestamp;

      data.push(item);
    });
    return data;
  }

  onAdd() {

  }


  onEdit(element) {

  }

  onEditPermisos() {

  }

  onDelete(element) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: true,
      width: '450px',
      data: {
        title: 'Confirmación',
        question: 'Desea eliminar el elemento?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.remove(element).subscribe(
          data => {
            this.successHandle(data);
            this.onRefresh();
            return true;
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  successHandle(data) {
    this.onRefreshData();
    this.toastr.success(
      'El elemento ha sido eliminado con éxito',
      'Felicidades',
      {
        timeOut: 5000,
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
  }

  showDetails(element) {
    // console.log(element);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


}
