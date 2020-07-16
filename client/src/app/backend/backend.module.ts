import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendRoutingModule } from './backend-routing.module';
import { LayoutComponent } from './layout/layout.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonDialogsModule } from './common-dialogs-module/common-dialogs.module';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { PreviousRouteService } from 'src/app/core/services/previous-route/previous-route.service';
import { NavService } from './common-layout-components/menu-list-item/nav.service';
import { BreadcrumbService } from './common-layout-components/breadcrumd/service/breadcrumb.service';
import { BreadcrumdComponent } from './common-layout-components/breadcrumd/breadcrumd.component';
import { MenuListItemComponent } from './common-layout-components/menu-list-item/menu-list-item.component';
import { PanelNotificationsComponent } from './common-layout-components/panel-notifications/panel-notifications.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { AdminListCompanyComponent } from './appBackoffice/admin-list-company/admin-list-company.component';

///////////////////////////////////////////////////////////////////
@NgModule({
  imports: [
    CommonModule,
    BackendRoutingModule,
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
    MatSidenavModule,
    MatProgressBarModule,
    CommonDialogsModule,
  ],
  declarations: [LayoutComponent, PanelNotificationsComponent, MenuListItemComponent, BreadcrumdComponent],
  entryComponents: [PanelNotificationsComponent],
  providers: [BreadcrumbService, NavService, PreviousRouteService],
})
export class BackendModule {}
