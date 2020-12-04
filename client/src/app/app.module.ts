import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './core/services/interceptors/loader-interceptor.service';
import { HttpErrorInterceptorService } from './core/services/interceptors/http-error-interceptor.service';
import { TokenInterceptorService } from './core/services/interceptors/token-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import * as ng2Charts from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ng2Charts.ChartsModule,
    ColorPickerModule,
    ng2Charts.ChartsModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
