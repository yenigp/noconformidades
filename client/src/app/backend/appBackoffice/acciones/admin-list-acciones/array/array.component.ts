import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { TareasService } from 'src/app/backend/services/tareas/tareas.service';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss'],
})
export class ArrayComponent implements OnInit {
  formData: FormArray;
  lastSubscription: any;
  aCasoAlgoCambioEnAcciones: boolean = false;
  maxDate: Date;
  minDate: Date;
  hide = true;
  estado: any[] = ['registrada', 'revisada', 'cerrada'];
  startDate = new Date();
  myFilter = function (d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  allTareas: [] = [];
  @Input() acciones: any;
  @Input() Tareas: any;
  @Output() respuesta = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private tareasService: TareasService) {
    this.formData = new FormArray([]);
    this.minDate = new Date();
    this.maxDate = new Date(new Date().setDate(new Date().getDate() + 30));
    this.Tareas = {};
  }

  updateLength() {
    this.fb.group({
      nombre: [null, []],
      descripcion: [null, []],
      FechaComienzo: [null, []],
      FechaFin: [null, []],
      estado: [null, []],
    });
  }

  prepareAccionesResumen() {
    this.formData.valueChanges.subscribe((val) => {
      this.aCasoAlgoCambioEnAcciones = true;
      this.respuesta.emit(val);
    });
  }
  ngOnInit(): void {
    this.tareasService.getAllTareas().subscribe((data) => {
      this.allTareas = data.data;
    });
    if (this.Tareas) {
      for (let i = 0; i < this.Tareas.length; i++) {
        const element = this.Tareas[i];
        this.formData.push(
          this.fb.group({
            Tareas: [element.Tareas ? element.Tareas : '', []],
            nombre: [element.nombre ? element.nombre : '', []],
            descripcion: [element.descripcion ? element.descripcion : '', []],
            FechaComienzo: [element.rol ? element.rol : '', []],
            FechaFin: [element.description ? element.description : '', []],
            estado: [element.estado ? element.estado : '', []],
          }),
        );
      }
    }
    this.formData.push(
      this.fb.group({
        Tareas: [null, []],
        nombre: [null, []],
        descripcion: [null, []],
        FechaComienzo: [null, []],
        FechaFin: [null, []],
        estado: [null, []],
      }),
    );

    this.prepareAccionesResumen();
  }
}
