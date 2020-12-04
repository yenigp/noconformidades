import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-auditoria',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
  @Input() auditoria: any;
  @Input() Acciones: any;
  constructor() {}

  ngOnInit(): void {}
}
