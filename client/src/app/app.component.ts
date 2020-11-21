import { Component, AfterViewInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'BACKEND-SGNC';

  constructor(private spinner: NgxSpinnerService) {
    this.spinner.show();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
}
