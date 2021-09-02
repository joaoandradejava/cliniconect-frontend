import { PessoaInput } from './../../../models/pessoa-input';
import { MensagemService } from './../../../services/mensagem.service';
import { PessoaService } from './../../../services/pessoa.service';
import { ValidadorFormulario } from './../../../utils/validador-formulario';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-pessoa-input',
  templateUrl: './pessoa-input.component.html',
  styleUrls: ['./pessoa-input.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('630ms 0s ease-in', keyframes([
          style({ opacity: .3, transform: 'translateX(-300px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),

        ]))
      ])),

      transition(':leave', query('*', [
        animate('200ms 0s ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(300px)', offset: 1 }),

        ]))
      ]))
    ])
  ]
})
export class PessoaInputComponent implements OnInit {
  estado: string = ''

  formulario: FormGroup
  pessoaId: number = -1;



  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private pessoaService: PessoaService, private router: Router, private mensagemService: MensagemService) {
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
    this.route.params.subscribe(data => {
      this.pessoaId = data.id
    })

    if (this.isEditar()) {
      this.pessoaService.buscarPorId(this.pessoaId).subscribe(data => {
        this.formulario.get('nome')?.setValue(data.nome)
        this.formulario.get('email')?.setValue(data.email)
        this.formulario.get('cpf')?.setValue(data.cpf)
        this.formulario.get('sexo')?.setValue(data.sexo)
        this.formulario.get('dataNascimento')?.setValue(new Date(data.dataNascimento))
        this.formulario.get('celular')?.setValue(data.celular)
      })
    }
  }

  textoBotao(): string {
    return this.isEditar() ? 'Editar' : 'Salvar'
  }

  private isEditar(): boolean {
    return this.pessoaId > 0 ? true : false
  }

  cancelar(): void {
    this.formulario.reset()
    this.formulario.get('sexo')?.setValue('MASCULINO')
  }

  public pegarCssFormulario(label: string): any {
    return ValidadorFormulario.pegarCssFormulario(this.formulario, label)
  }

  public campoObrigatorio(label: string): string {
    return ValidadorFormulario.campoObrigatorio(label)
  }

  public campoInvalido(label: string): string {
    return ValidadorFormulario.campoInvalido(label)
  }

  public campoTamanhoMaximoEMinimo(label: string, maximo: number, minimo: number): string {
    return ValidadorFormulario.campoTamanhoMaximoEMinimo(label, maximo, minimo)
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      return
    }

    if (!this.isEditar()) {
      this.pessoaService.salvar(this.formulario.value).subscribe(data => {
        this.router.navigate(['/pessoas/pessoa-input/' + data.id])
        this.mensagemService.mostrarMensagemSucesso('Cadastro da pessoa realizado com sucesso!')
      })
    } else {
      this.pessoaService.atualizar(this.formulario.value, this.pessoaId).subscribe(data => {
        this.mensagemService.mostrarMensagemSucesso('Pessoa atualizada com sucesso!')

      })
    }
  }


}
