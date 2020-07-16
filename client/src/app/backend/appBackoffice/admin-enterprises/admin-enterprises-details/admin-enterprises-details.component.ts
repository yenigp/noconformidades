import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterpriseService } from 'src/app/backend/services/enterprise/enterprise.service';
import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
import { UtilsService } from 'src/app/core/services/utils/utils.service';
import { BreadcrumbService } from 'src/app/backend/common-layout-components/breadcrumd/service/breadcrumb.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-admin-enterprises-details',
  templateUrl: './admin-enterprises-details.component.html',
  styleUrls: ['./admin-enterprises-details.component.scss']
})

export class AdminEnterprisesDetailsComponent implements OnInit {
  Enterprise: any = {};
  isLoading: boolean = true;
  imageUrl: any;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
    private router: Router,
    private enterpriseService: EnterpriseService,

    private utilsService: UtilsService,
    private showToastr: ShowToastrService
  ) {
    this.imageUrl = environment.imageUrl;

  }

  getEnterpriseInfo(enterpriseId) {
    this.enterpriseService.getEnterprise({ id: enterpriseId }).subscribe(
      data => {
        this.Enterprise = data.data;
        this.isLoading = false;
      },
      err => {
        this.utilsService.errorHandle(err, 'Deploy', 'Listing');
      }
    );
  }

  ngOnInit(): void {
    this.breadcrumbService.clearBreadcrumd();
    this.breadcrumbService.setBreadcrumd('Empresa', false, '/backend/empresas');
    this.breadcrumbService.setBreadcrumd('Detalles', true);

    this.route.paramMap.subscribe(paramMap => {
      this.getEnterpriseInfo(paramMap.get('enterpriseId'))
    })
  }

  onAddDeploy() {
    this.router.navigate(['/backend/deploys/create'], { queryParams: { EnterpriseId: this.Enterprise.id, redirect: window.location.pathname } });
  }

  onEditDeploy(deploy) {
    this.router.navigate(['/backend/deploys/edit'], { queryParams: { DeployId: deploy.id, redirect: window.location.pathname } });
  }
}