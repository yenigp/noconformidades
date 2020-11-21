import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resumen-noconformidad',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss'],
})
export class ResumenComponent implements OnInit {
  @Input() noconformidad: any;
  @Input() Usuario: any;
  constructor() {}

  ngOnInit(): void {}
}
