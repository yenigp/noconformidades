import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { BackendGuard } from './backend/backend.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/backend/backend.module').then((m) => m.BackendModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'authentication',
        loadChildren: () => import('../app/authentication/authentication.module').then((m) => m.AuthenticationModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: 'backend',
        loadChildren: () => import('../app/backend/backend.module').then((m) => m.BackendModule),
        canActivate: [BackendGuard],
      },
      {
        path: 'error',
        loadChildren: () => import('../app/error/error.module').then((m) => m.ErrorModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'backend',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
