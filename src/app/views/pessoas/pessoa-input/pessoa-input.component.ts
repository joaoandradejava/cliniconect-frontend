import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoa-input',
  templateUrl: './pessoa-input.component.html',
  styleUrls: ['./pessoa-input.component.scss']
})
export class PessoaInputComponent implements OnInit {

  formulario: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.formulario = formBuilder.group({
      "nome": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "email": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255), Validators.email]],
      "cpf": ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      "sexo": ['MASCULINO', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
      "dataNascimento": [new Date(), [Validators.required]],
      "celular": ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    })
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.formulario.reset()
  }

}
