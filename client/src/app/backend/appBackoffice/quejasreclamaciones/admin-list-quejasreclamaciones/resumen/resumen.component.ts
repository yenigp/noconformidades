import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-quejasreclamaciones',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
  @Input() quejasreclamaciones: any;
  @Input() Acciones: any;
  constructor() {}

  ngOnInit(): void {}
}
