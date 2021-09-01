import { PessoaModelPage } from './../../models/pessoa-model-page';
import { PessoaModel } from './../../models/pessoa-model';
import { PessoaService } from './../../services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  pessoaModelPage?: PessoaModelPage
  tamanhoDaPagina: number = 1
  paginaAtual: number = 0

  constructor(private pessoaService: PessoaService) { }

  ngOnInit(): void {
    this.buscarTodos()
  }

  private buscarTodos(): void {
    this.pessoaService.buscarTodos(this.paginaAtual, this.tamanhoDaPagina).subscribe(data => {
      this.pessoaModelPage = data
    })
  }

  isTemPessoasNoSistema(): boolean {
    return this.pessoaModelPage?.content != undefined && this.pessoaModelPage!.content.length > 0
  }

  pageChanged(event: PageChangedEvent): void {
    this.paginaAtual = event.page - 1
    this.buscarTodos()
  }
}
