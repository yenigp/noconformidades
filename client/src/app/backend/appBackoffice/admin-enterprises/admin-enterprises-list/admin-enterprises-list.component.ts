import { IPagination } from 'src/app/core/classes/pagination.class';
import { IUser } from 'src/app/core/classes/user.class';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation, Input, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { DialogEditEnterprisesComponent } from '../dialog-edit-enterprises/dialog-edit-enterprises.component';
import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { EnterpriseService } from '../../../services/enterprise/enterprise.service';
import { ConfirmationDialogComponent } from 'src/app/backend/common-dialogs-module/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-enterprises-list',
  templateUrl: './admin-enterprises-list.component.html',
  styleUrls: ['./admin-enterprises-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminEnterprisesListComponent implements OnInit, OnDestroy {
  urlImage: string;
  innerWidth: any;
  applyStyle = false;
  allServices: any[] = [];
  searchForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  loggedInUser: IUser;
  loading = false;
  _unsubscribeAll: Subject<any>;
  selection: SelectionModel<any>;
  imageUrl: any;

  searchElementCount = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading = false;

  query: IPagination = {
    limit: 0,
    offset: 0,
    order: '-name',
    filter: {
      filterText: null,
      properties: [],
    },
  };


  constructor(
    private loggedInUserService: LoggedInUserService,
    private enterpriseService: EnterpriseService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    public dialog: MatDialog,
    public utilsService: UtilsService,
    private showToastr: ShowToastrService,
  ) {
    this._unsubscribeAll = new Subject<any>();
    this.dataSource = new MatTableDataSource([]);
    this.selection = new SelectionModel<any>(true, []);
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.imageUrl = environment.imageUrl;
  }

  ngOnInit() {
    this.refreshData();

    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Nuestros clientes', true);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  refreshData(): void {
    this.isLoading = true;
    this.enterpriseService.getAllEnterprises(this.query).subscribe(
      (data) => {
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].apis = 0;
          data.data[i].clients = 0;
          data.data[i].apps = 0;
          data.data[i].deploys = data.data[i].Deploys.length;
          for (let deploy = 0; deploy < data.data[i].Deploys.length; deploy++) {
            const element = data.data[i].Deploys[deploy];
            if (element.Project.type == 'api') {
              data.data[i].apis++;
            } else if (element.Project.type == 'client') {
              data.data[i].clients++;
            } else if (element.Project.type == 'app') {
              data.data[i].apps++;
            }
          }
        }
        this.initTable(data.data);
        this.searchElementCount = data.meta.total;
        this.selection.clear();
        this.isLoading = false;
      },
      (error) => {
        this.utilsService.errorHandle(error);
        this.selection.clear();
        this.isLoading = false;
      },
    );
  }

  initTable(data) {
    this.allServices = data;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  /////// Select logic/////////////////

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

  //////////////////////////////

  onCreateService(): void {
    let dialogRef: MatDialogRef<DialogEditEnterprisesComponent, any>;
    dialogRef = this.dialog.open(DialogEditEnterprisesComponent, {
      panelClass: 'app-dialog-edit-services',
      maxWidth: '100vw',
      maxHeight: '100vh',
      data: {
        isEditing: false,
        selectedBicon: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshData();
    });
  }



  onShowService(service): void {
    this.router.navigate(['/backend/empresas/details/' + service.id])
  }


  onEditService(service): void {
    this.enterpriseService.getEnterprise(service).subscribe(
      (data) => {
        let dialogRef: MatDialogRef<DialogEditEnterprisesComponent, any>;
        dialogRef = this.dialog.open(DialogEditEnterprisesComponent, {
          panelClass: 'app-dialog-edit-services',
          maxWidth: '100vw',
          maxHeight: '100vh',
          data: {
            isEditing: true,
            selectedEnterprise: data.data,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.refreshData();
        });
      },
      (error) => {
        this.utilsService.errorHandle2(error);
      },
    );
  }

  async onRemoveServices(services) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmation',
        question: 'Estas seguro de eliminar estas empresas?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      try {
        if (result) {
          const data = await Promise.all(services.map((item) => this.enterpriseService.removeEnterprise(item)));
          this.showToastr.showSucces('Eliminados correctamente', 'Ok', 7500);
          this.refreshData();
        }
      } catch (error) {
        this.utilsService.errorHandle(error);

        this.refreshData();
      }
    });
  }

  public onChangeSorting(val) {
    let value = val.split('-');
    let orden = 1;
    let field = null;
    if (value.length > 1) {
      orden = 1;
      field = value[1];
    } else {
      orden = -1;
      field = value[0];
    }
    this.allServices = this.allServices.sort(function (a, b) {
      if (a[field] < b[field]) {
        return orden;
      }
      if (a[field] > b[field]) {
        return -1 * orden;
      } else {
        return 0;
      }
    });
  }
}
