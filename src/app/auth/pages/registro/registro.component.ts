import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { emailPattern, nombreApellidoPattern, noPuedeSerSasuke } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.pattern(this.vs.emailPattern)], [this.ev]],
    username: ['',[Validators.required, this.vs.noPuedeSerSasuke]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]],
  }, {
    validators: [this.vs.camposIguales('password','password2')]
  })

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'Email es obligatorio'
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo electrónico'
    } else if (errors?.['emailTomado']) {
      return 'El email ya fue usado'
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private ev: EmailValidatorService) {  }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Julian Gonzalez',
      email:'test@gmail.com',
      username: 'julianfeg12',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
