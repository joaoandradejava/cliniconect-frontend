import { MensagemService } from './../../../services/mensagem.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaEnderecoService } from './../../../services/pessoa-endereco.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-endereco-input',
  templateUrl: './endereco-input.component.html',
  styleUrls: ['./endereco-input.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('700ms 0s ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-300px)', offset: 0 }),
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
export class EnderecoInputComponent implements OnInit {
  estado: string = ''

  cepValido: boolean = false

  pessoaId: number = -1
  enderecoId: number = -1

  formulario: FormGroup
  constructor(private route: ActivatedRoute, private pessoaEnderecoService: PessoaEnderecoService, private formBuilder: FormBuilder, private router: Router, private mensagemService: MensagemService) {
    this.formulario = formBuilder.group({
      "cep": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
      "rua": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "bairro": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "numero": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "cidade": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      "estado": ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.pessoaId = data.id
      this.enderecoId = data.enderecoId
    })

    if (this.isEditar()) {
      this.pessoaEnderecoService.buscarEnderecoDaPessoa(this.pessoaId, this.enderecoId).subscribe(data => {
        this.formulario.get('cep')?.setValue(data.cep)
        this.formulario.get('rua')?.setValue(data.rua)
        this.formulario.get('bairro')?.setValue(data.bairro)
        this.formulario.get('numero')?.setValue(data.numero)
        this.formulario.get('cidade')?.setValue(data.cidade)
        this.formulario.get('estado')?.setValue(data.estado)

      })
    }
  }

  buscarCep(): void {
    if (this.formulario.get('cep')?.value.length >= 8) {
      this.pessoaEnderecoService.buscarEnderecoPeloCep(this.formulario.get('cep')?.value).subscribe(data => {
        this.formulario.get('rua')?.setValue(data.logradouro)
        this.formulario.get('bairro')?.setValue(data.bairro)
        this.formulario.get('cidade')?.setValue(data.localidade)
        this.formulario.get('estado')?.setValue(data.uf)

        this.cepValido = true
        if(data.erro == true){
          this.cepValido = false
          this.mensagemService.mostrarMensagemAlerta('Cep inválido')
        }
      })
    }
  }

  isTextoBotao(): string {
    return this.isEditar() ? 'Editar' : 'Salvar'
  }

  private isEditar(): boolean {
    return this.enderecoId > 0 ? true : false
  }

  cancelar(): void {
    this.formulario.reset()
  }

  public salvar(): void {
    if (this.formulario.invalid) {
      return
    }

    if (!this.isEditar()) {
      this.pessoaEnderecoService.salvar(this.formulario.value, this.pessoaId).subscribe(data => {
        this.router.navigate([`/pessoas/${this.pessoaId}/enderecos/endereco-input/${data.id}`])
        this.mensagemService.mostrarMensagemSucesso('Endereço adicionado com sucesso')
      })
    } else {
      this.pessoaEnderecoService.atualizar(this.formulario.value, this.pessoaId, this.enderecoId).subscribe(data => {
        this.mensagemService.mostrarMensagemSucesso('Endereço atualizado com sucesso')
      })
    }

  }


}
