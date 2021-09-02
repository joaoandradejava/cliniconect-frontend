import { FormBuilder, FormGroup } from '@angular/forms';
import { MensagemService } from './../../services/mensagem.service';
import { PessoaModelPage } from './../../models/pessoa-model-page';
import { PessoaService } from './../../services/pessoa.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { debounceTime } from 'rxjs/operators';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss'],
  animations: [
    trigger('lista-animacao', [
      transition(':enter', query('*', [
        animate('700ms 0s ease-in', keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1}),
        ]))
      ])),

      transition(':leave', query('*', [
        animate('200ms 0s ease-out', keyframes([
          style({opacity: 1, offset: 0}),
          style({opacity: 0, offset: 1}),
        ]))
      ]))
    ])
  ]
})
export class PessoasComponent implements OnInit {
  estado: string = ''

  modalRef?: BsModalRef;

  pessoaModelPage?: PessoaModelPage
  tamanhoDaPagina: number = 10
  paginaAtual: number = 0
  pessoaSelecionada: number = -1;

  formularioBusca: FormGroup

  constructor(private pessoaService: PessoaService, private modalService: BsModalService, private mensagemService: MensagemService, private formBuilder: FormBuilder) {
    this.formularioBusca = formBuilder.group({
      "nome": [''],
      "cpf": [''],
      "tipoDeBusca": ['nome']
    })
  }

  isBuscarPorNome(): boolean {
    return this.formularioBusca.get('tipoDeBusca')?.value == 'nome'
  }

  ngOnInit(): void {
    this.buscarTodos()

    this.formularioBusca.get('tipoDeBusca')?.valueChanges.subscribe(data => {
      this.formularioBusca.get('nome')?.setValue('')
      this.formularioBusca.get('cpf')?.setValue('')
    })

    this.formularioBusca.get('nome')?.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.buscarTodos()
    })

    this.formularioBusca.get('cpf')?.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.buscarTodos()
    })
  }

  private buscarTodos(): void {
    let nome: string = this.buscarValorFormulario('nome')
    let cpf: string = this.buscarValorFormulario('cpf')

    this.pessoaService.buscarTodos(this.paginaAtual, this.tamanhoDaPagina, nome, cpf).subscribe(data => {
      this.pessoaModelPage = data
    })
  }

  private buscarValorFormulario(label: string): string {
    return this.formularioBusca.get(label)?.value.trim()
  }

  isTemPessoasNoSistema(): boolean {
    return this.pessoaModelPage?.content != undefined && this.pessoaModelPage!.content.length > 0
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginaAtual = event.page - 1
    this.buscarTodos()
  }

  openModal(template: TemplateRef<any>, pessoaId: number) {
    this.pessoaSelecionada = pessoaId
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deletar(): void {
    this.pessoaService.deletarPorId(this.pessoaSelecionada).subscribe(data => {
      this.modalRef?.hide()
      this.mensagemService.mostrarMensagemSucesso('Pessoa deletada com sucesso!')
      this.paginaAtual = 0
      this.buscarTodos()
    })
  }
}
