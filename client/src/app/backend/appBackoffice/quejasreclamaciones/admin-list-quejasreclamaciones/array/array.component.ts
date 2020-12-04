import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { TipoACService } from 'src/app/backend/services/tipoac/tipoac.service';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
})
export class ArrayComponent implements OnInit {
  formData: FormArray;
  lastSubscription: any;
  codigo: any;
  aCasoAlgoCambio: boolean = false;
  TipoAC: any[] = [];
  maxDate: Date;
  minDate: Date;
  hide = true;
  @Input() quejasreclamaciones: any;
  @Input() Acciones: any;
  @Output() respuesta = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private tipoacService: TipoACService) {
    this.formData = new FormArray([]);
    this.minDate = new Date();
    this.maxDate = new Date(new Date().setDate(new Date().getDate() + 15));
    this.Acciones = {};
    this.codigo = new Date().getTime().toString();
  }

  updateLength() {
    this.formData.push(
      this.fb.group({
        TipoId: [null, []],
        AccionTomar: [null, []],
        FechaCumplimiento: [null, []],
        codigo: [this.codigo, []],
      }),
    );
  }

  prepareQuejasReclamacionesResumen() {
    this.formData.valueChanges.subscribe((val) => {
      this.aCasoAlgoCambio = true;
      this.Acciones = val;
      this.respuesta.emit(val);
    });
  }
  ngOnInit(): void {
    this.tipoacService.getAllTipoAC().subscribe((data) => {
      this.TipoAC = data.data;
    });
    if (this.Acciones) {
      for (let i = 0; i < this.Acciones.length; i++) {
        const element = this.Acciones[i];
        this.formData.push(
          this.fb.group({
            codigo: [element.codigo ? element.codigo : this.codigo, []],
            TipoId: [element.TipoId ? element.TipoId : '', []],
            AccionTomar: [element.AccionTomar ? element.AccionTomar : '', []],
            FechaCumplimiento: [element.FechaCumplimiento ? element.FechaCumplimiento : '', []],
          }),
        );
      }
    }
    this.formData.push(
      this.fb.group({
        codigo: [this.codigo, []],
        TipoId: [null, []],
        AccionTomar: [null, []],
        FechaCumplimiento: [null, []],
      }),
    );

    this.prepareQuejasReclamacionesResumen();
  }
}
