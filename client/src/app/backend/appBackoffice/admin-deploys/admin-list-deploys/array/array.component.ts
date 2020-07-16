import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})

export class ArrayComponent implements OnInit {
  formData: FormArray;
  lastSubscription: any;
  aCasoAlgoCambio: boolean = false;
  @Input() deploy: any;
  @Input() webClients: any;
  @Output() respuesta = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
  ) {
    this.formData = new FormArray([]);

    this.webClients = {};
  }


  updateLength() {
    this.lastSubscription = this.formData.at(this.formData.length - 1).valueChanges.subscribe(val => {
      this.lastSubscription.unsubscribe();
      this.formData.push(
        this.fb.group({
          username: [null, []],
          cipheredPass: [null, []],
          rol: [null, []],
          description: [null, []],
        })
      );
      this.updateLength();
    })
  }


  prepareDeployResumen() {
    this.formData.valueChanges.subscribe(val => {
      this.aCasoAlgoCambio = true;
      this.webClients = val;
      this.respuesta.emit(val);
    });
  }
  ngOnInit(): void {
    if (this.webClients) {
      for (let i = 0; i < this.webClients.length; i++) {
        const element = this.webClients[i];
        this.formData.push(
          this.fb.group({
            username: [element.username ? element.username : '', []],
            cipheredPass: [element.cipheredPass ? element.cipheredPass : '', []],
            rol: [element.rol ? element.rol : '', []],
            description: [element.description ? element.description : '', []],
          })
        )
      }
    }
    this.formData.push(
      this.fb.group({
        username: [null, []],
        cipheredPass: [null, []],
        rol: [null, []],
        description: [null, []],
      })
    )


    this.updateLength();
    this.prepareDeployResumen();

  }



}
