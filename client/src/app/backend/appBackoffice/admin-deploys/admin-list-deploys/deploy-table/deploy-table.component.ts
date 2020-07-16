
import { DeployService } from '../../../../services/deploys/deploys.service';
import { IPagination } from 'src/app/core/classes/pagination.class';

import { debounceTime } from 'rxjs/operators';

import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { StateCreatingDeployService } from '../../../../services/state-creating-deploy/state-creating-deploy.service';

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
  selector: 'app-deploy-table',
  templateUrl: './deploy-table.component.html',
  styleUrls: ['./deploy-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DeployTableComponent implements OnInit {
  @Input() role;
  urlImage: string;
  innerWidth: any;
  applyStyle = false;
  query: {
    order: any
  };
  allDeploys: any[] = [];
  searchForm: FormGroup;
  expandedElement: false;
  dataSource: MatTableDataSource<any>;
  showFilterDeploy: boolean;
  loggedInUser: IUser;
  loading = false;
  _unsubscribeAll: Subject<any>;
  selection: SelectionModel<any>;
  showActionsBtn = false;

  displayedColumns: string[] = [
    'select',

    'EnterpriseId',

    'ProjectId',

    'domain',

    'branch',

    'environment',

    // 'autodeploy',

    'serverIp',

    // 'userIp',

    // 'CreatorId',

    // 'descrition',

    'tags',

    'actions'
  ];
  pageSizeOptions: number[] = [10, 25, 100, 1000];
  searchElementCount = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
    private deployService: DeployService,
    private stateCreatingDeployService: StateCreatingDeployService,
    private router: Router,
    public dialog: MatDialog,
    private utilsService: UtilsService,
    private showToastr: ShowToastrService
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.selection = new SelectionModel<any>(true, []);
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
  }

  ngOnInit() {
    this.refreshData();
    this.createSearchForm();

    this.searchForm.valueChanges.subscribe(val => {
      const data = this.allDeploys;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  refreshData(): void {

    this.deployService
      .getAllDeploys({ limit: 0, offset: 0 }, { role: this.role })
      .subscribe(
        data => {
          this.initTable(data.data);
          this.searchElementCount = data.meta.total;
          this.selection.clear();
        },
        error => {
          this.utilsService.errorHandle(error);
          this.selection.clear();
        }
      );

  }


  initTable(data) {
    this.allDeploys = data;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      textCtrl: ['', [Validators.required]]
    });
  }

  showSearchForm() {
    this.showFilterDeploy = true;
  }

  hideSearchForm() {
    this.showFilterDeploy = false;
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
      } row ${row.position + 1}`;
  }



  onEditDeploy(deploy): void {
    // this.deployService.getDeploy(deploy).subscribe(
    //   data => {
    //     console.log('Vamos a editar el deploy::', data.data.id);
    //     this.stateCreatingDeployService.setProducCreated(data.data);
    this.router.navigate(['/backend/deploys/edit'], { queryParams: { DeployId: deploy.id } });
    //   },
    //   err => {
    //     this.utilsService.errorHandle(err, 'Deploy', 'Listing');
    //   }
    // );
  }

  async onRemoveDeploy(deploys) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmación',
        question: '¿Está seguro que desea eliminar?'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      try {
        if (result) {

          const data = await Promise.all(
            deploys.map(item => this.deployService.removeDeploy(item))
          );
          this.showToastr.showSucces(
            'Deploys successfully removed',
            'Succes',
            7500
          );
          this.refreshData();

        }
      } catch (error) {
        this.utilsService.errorHandle(error);
        this.refreshData();
      }
    });
  }
}
