import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadContentDirective } from './lazy-load-content.directive';



@NgModule({
  declarations: [LazyLoadContentDirective],
  imports: [
    CommonModule
  ],
  exports: [LazyLoadContentDirective]
})
export class LazyLoadContentModule { }
