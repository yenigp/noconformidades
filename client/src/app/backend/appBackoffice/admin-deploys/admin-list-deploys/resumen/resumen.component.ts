import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-deploy',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})

export class ResumenComponent implements OnInit {
  @Input() deploy: any;
  @Input() webClients: any;
  constructor(
  ) {

  }



  ngOnInit(): void {
  }


}
