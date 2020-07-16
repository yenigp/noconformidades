import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { SkeletonLoadingCardsComponent } from './skeleton-loading-cards.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    SkeletonLoadingCardsComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [
    NgxSkeletonLoaderModule,
    SkeletonLoadingCardsComponent
  ]
})
export class SkeletonLoadingCardsModule { }
