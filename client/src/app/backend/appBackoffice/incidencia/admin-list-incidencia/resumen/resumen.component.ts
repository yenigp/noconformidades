import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-incidencia',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
  @Input() incidencia: any;
  @Input() Acciones: any;
  constructor() {}

  ngOnInit(): void {}
}
