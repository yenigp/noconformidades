import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { BreadcrumbService } from '../../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { ProjectService } from 'src/app/backend/services/project/project.service';
import { EnterpriseService } from 'src/app/backend/services/enterprise/enterprise.service';

import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
import { IUser } from 'src/app/core/classes/user.class';


import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DeployService } from '../../../../services/deploys/deploys.service';
import { StateCreatingDeployService } from '../../../../services/state-creating-deploy/state-creating-deploy.service';
import { IPagination } from 'src/app/core/classes/pagination.class';

@Component({
  selector: 'app-create-product',
  templateUrl: './deploy-create.component.html',
  styleUrls: ['./deploy-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductComponent implements OnInit, OnDestroy {
  Enterprises: any[] = [];
  Projects: any[] = [];
  stepIndex = 0;
  stepPass = 0;
  loggedInUser: IUser = null;
  productCreated: any = null;
  _unsubscribeAll: Subject<any>;
  recomendedProducts: any[] = [];
  recomendedProductsOutput: any[] = [];
  tags: any[] = [];
  isSaving = false;
  isEditing = false;
  innerWidth: any;
  applyStyle = false;
  form: FormGroup;
  allEnterprises: any[] = [];
  allProjects: any[] = [];
  deploy: any;
  webClients: any[] = [];
  rellenarUsuarios: boolean = false;
  aCasoAlgoCambioEnUsers: boolean = false;
  aCasoAlgoCambioEnDeploy: boolean = false;
  queryParams: any = {};
  alreadyLoaded: boolean = false;
  // selectedEnterprise: number = 2;
  ////////////////////Pagination Structure/////////////////////
  query: IPagination = {
    limit: 0,
    total: 0,
    offset: 0,
    order: '-updatedAt',
    page: 1,
    filter: { filterText: '', properties: [] }
  };
  action: string = 'Siguente';

  //////////////////////////////////////////
  /**
   * Session para referencias externas
   */
  getAllEnterprises(): void {
    this.enterpriseService.getAllEnterprises(this.query).subscribe((data) => {
      this.allEnterprises = data.data;

      if (this.queryParams.EnterpriseId) {
        this.form.controls['EnterpriseId'].setValue(parseInt(this.queryParams.EnterpriseId));
      }
    }, error => {
      console.log(error);
      this.utilsService.errorHandle(error);
    });
  }
  getAllProjects(): void {
    this.projectService.getAllProjects(this.query).subscribe((data) => {
      this.allProjects = data.data;
    }, error => {
      console.log(error);
      this.utilsService.errorHandle(error);
    });
  }

  ////////////////////////////////
  @ViewChild('stepper', { static: false }) stepper: any;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private spinner: NgxSpinnerService,
    public utilsService: UtilsService,
    private enterpriseService: EnterpriseService,
    private projectService: ProjectService,
    private loggedInUserService: LoggedInUserService,
    private showToastr: ShowToastrService,
    private deployService: DeployService,
    private stateDeploy: StateCreatingDeployService,
    private router: Router,
    private route: ActivatedRoute,

    private fb: FormBuilder,
  ) {

    this.deploy = {}
    this.getAllEnterprises();
    this.getAllProjects();
    this._unsubscribeAll = new Subject<any>();
    this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
    })
    this.getDeploy()



  }

  getDeploy() {
    if (this.queryParams.DeployId) {

      this.deployService.getDeploy({ id: this.queryParams.DeployId }).subscribe(
        data => {
          this.productCreated = data.data;
          this.generarReport()
        },
        err => {
          this.utilsService.errorHandle(err, 'Deploy', 'Listing');
        }
      );
    } else {
      this.generarReport()
    }
  }

  generarReport() {
    if (this.productCreated) {
      this.rellenarResumen(this.productCreated);
      this.webClients = this.productCreated.WebClients;
      this.rellenarUsuarios = true;
    } else {
      this.rellenarUsuarios = true;
    }
    this.buildForm();
  }

  ngOnInit() {

    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Deploys', false, '/backend/deploys');
    this.breadcrumbService.setBreadcrumd('Crear deploy', true);


    this.enterpriseService.getAllEnterprises().subscribe((data) => {
      this.Enterprises = data.data;
    });
    this.projectService.getAllProjects().subscribe((data) => {
      this.Projects = data.data;
    });


  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getEnterpriseName(id) {
    let enterprise = this.allEnterprises.find(item => item.id === id)
    return enterprise ? enterprise.name : '';
  }

  getProjectName(id) {
    let enterprise = this.allProjects.find(item => item.id === id);
    return enterprise ? enterprise.name : '';
  }

  prepareDeployResumen() {
    this.form.valueChanges.subscribe(val => {
      this.rellenarResumen(val);
    })
  }

  rellenarResumen(val) {
    if (val.Enterprise) {
      this.deploy.enterprise = val.Enterprise.name;
    } else {
      this.deploy.enterprise = val.EnterpriseId ? this.getEnterpriseName(val.EnterpriseId) : '';
    }
    if (val.Project) {
      this.deploy.project = val.Project.name;
    } else {
      this.deploy.project = val.ProjectId ? this.getProjectName(val.ProjectId) : '';
    }
    this.deploy.domain = val.domain ? val.domain : '';
    this.deploy.environment = val.environment ? val.environment : '';
    this.deploy.branch = val.branch ? val.branch : '';
    this.deploy.serverIp = val.serverIp ? val.serverIp : '';
    this.deploy.userIp = val.userIp ? val.userIp : '';
    this.deploy.description = val.description ? val.description : '';
  }


  buildForm(): void {
    let categories = null;
    if (this.productCreated && this.productCreated.Category) {
      categories = this.productCreated.Category.map((item) => item.id);
    }
    if (this.productCreated && this.productCreated.Projects) {
      categories = this.productCreated.Projects.map((item) => item.id);
    }

    const regUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const regIp = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    this.form = this.fb.group({
      EnterpriseId: [this.productCreated && this.productCreated.EnterpriseId ? this.productCreated.EnterpriseId : null, [Validators.required]],
      ProjectId: [this.productCreated && this.productCreated.ProjectId ? this.productCreated.ProjectId : null, [Validators.required]],
      domain: [this.productCreated && this.productCreated.domain ? this.productCreated.domain : null, [Validators.required, Validators.pattern(regUrl)]],
      branch: [this.productCreated && this.productCreated.branch ? this.productCreated.branch : null, [Validators.required]],
      environment: [this.productCreated && this.productCreated.environment ? this.productCreated.environment : null, [Validators.required]],
      // autodeploy: [this.productCreated && this.productCreated.autodeploy ? this.productCreated.autodeploy : null, [Validators.required]],
      serverIp: [this.productCreated && this.productCreated.serverIp ? this.productCreated.serverIp : null, [Validators.required, Validators.pattern(regIp)]],
      userIp: [this.productCreated && this.productCreated.userIp ? this.productCreated.userIp : null, []],
      // CreatorId: [this.productCreated && this.productCreated.CreatorId ? this.productCreated.CreatorId : null, [Validators.required]],
      description: [this.productCreated && this.productCreated.descrition ? this.productCreated.descrition : null, []],
      tags: [this.productCreated && this.productCreated.tags ? this.productCreated.tags : null, []],
    });
    this.prepareDeployResumen()
    this.form.valueChanges.subscribe(val => {
      this.aCasoAlgoCambioEnDeploy = true;
      this.action = "Guardar";
    })
    this.alreadyLoaded = true;
  }

  onSaveBasicProduct(): void {
    let data = this.form.value;
    this.spinner.show();
    if (this.productCreated) {
      if (this.aCasoAlgoCambioEnDeploy) {
        data.id = this.productCreated.id;
        this.deployService.editDeploy(data).subscribe(
          (data) => {
            this.showToastr.showSucces('Deploy actualizado exitosamente', "Aviso");
            this.productCreated = data.data;
            this.stepIndex += 1;
            this.spinner.hide();
          },
          (error) => {
            this.utilsService.errorHandle(error);
            this.spinner.hide();
          },
        );
      } else {
        this.stepIndex += 1;
        this.spinner.hide();
      }
    } else {
      this.deployService.createDeploy(data).subscribe(
        (data) => {
          this.showToastr.showSucces('Deploy creado exitosamente', "Aviso");
          this.productCreated = data.data;
          this.stepIndex += 1;
          this.spinner.hide();
        },
        (error) => {
          this.utilsService.errorHandle(error);
          this.spinner.hide();
        },
      );
    }
  }

  onSlectionChange(event): void {
    this.stepIndex = event.selectedIndex;
  }


  ProcesarUsuarios($event) {
    this.aCasoAlgoCambioEnUsers = true;
    this.webClients = $event;
  }


  onClearStorage(): void {
    localStorage.removeItem('deployCreated');
    this.productCreated = null;
    // this.showToastr.showSucces('El estado de almacenamiento del producto ha sido eliminado', "Aviso");
    this.form.reset();
  }

  //////////////////////////////////////////////////////////////////////////
  Finalizar() {
    /**
     * esta accion debe coger el id del deploy creado y darle un patch 
     * con el arreglo de web Clients
     * y luego de eso hacer un redirect para el listado de deploys
     */
    let data = {
      id: this.productCreated.id,
      WebClients: this.webClients
    }
    this.spinner.show();
    if (this.productCreated) {
      if (this.aCasoAlgoCambioEnUsers) {
        this.deployService.editDeploy(data).subscribe(
          (data) => {
            this.showToastr.showSucces('Deploy actualizado exitosamente', "Aviso");
            this.finalNavigation()
          },
          (error) => {
            this.utilsService.errorHandle(error);
            this.spinner.hide();
          },
        );
      } else {
        this.finalNavigation()
      }
    }
  }

  finalNavigation() {
    this.onClearStorage()
    this.spinner.hide();
    if (this.queryParams.redirect) {
      this.router.navigate([this.queryParams.redirect]);
    } else {
      this.router.navigate(['/backend/deploys']);
    }
  }
  getProgress() {
    let progress = 0;
    if (this.form && this.form.valid) {
      progress += 25;
    }
    return progress;
  }
}
