import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-acciones',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
  @Input() acciones: any;
  @Input() Tareas: any;
  constructor() {}

  ngOnInit(): void {}
}
