import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loading-cards',
  templateUrl: './skeleton-loading-cards.component.html',
  styleUrls: ['./skeleton-loading-cards.component.scss']
})
export class SkeletonLoadingCardsComponent implements OnInit {

  grid = {
    xs: 1, sm: 2, md: 3, lg: 4
  };

  arrayItems = {
    xs: [1],
    sm: [1, 1],
    md: [1, 1, 1],
    lg: [1, 1, 1, 1]
  };

  @Input()
  set setConfiguration(data) {
    this.grid = Object.assign({}, data);
    Object.keys(this.arrayItems).map(key => {
      this.arrayItems[key] = Array(this.grid[key]).fill(1, 0, this.grid[key] - 1);
    });
  }

  constructor() {
  }

  ngOnInit() {
    Object.keys(this.arrayItems).map(key => {
      this.arrayItems[key] = Array(this.grid[key]).fill(1, 0, this.grid[key] - 1);
    });

  }

}
