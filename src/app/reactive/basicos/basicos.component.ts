import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  /*miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl('RX 6600xt'),
    precio: new FormControl(365),
    existencias: new FormControl(2),
  });*/

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(0)]],
    existencias: [null, [Validators.required, Validators.min(0)]]
  })

  constructor( private fb: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'RX 6600XT',
      precio: 360,
      existencias: 2
    })
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
