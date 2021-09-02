import { MensagemService } from './../../../services/mensagem.service';
import { PessoaEnderecoService } from './../../../services/pessoa-endereco.service';
import { PessoaService } from './../../../services/pessoa.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { PessoaFullModel } from 'src/app/models/pessoa-full-model';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { animate, keyframes, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss'],
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
export class EnderecosComponent implements OnInit {
  estado: string = ''
  modalRef?: BsModalRef;

  pessoaFullModel?: PessoaFullModel
  pessoaId: number = -1;

  enderecoSelecionado: number = -1

  constructor(private pessoaService: PessoaService, private route: ActivatedRoute, private modalService: BsModalService, private pessoaEnderecoService: PessoaEnderecoService, private mensagemService: MensagemService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.pessoaId = data.id

      this.pessoaService.buscarPorId(this.pessoaId).subscribe(data => {
        this.pessoaFullModel = data
      })
    })
  }

  openModal(template: TemplateRef<any>, enderecoId: number) {
    this.enderecoSelecionado = enderecoId
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  isPossuiEnderecos(): boolean {
    return this.pessoaFullModel != undefined && this.pessoaFullModel.enderecos != undefined && this.pessoaFullModel!.enderecos.length > 0
  }

  deletarEndereco(): void {
    this.pessoaEnderecoService.deletar(this.pessoaId, this.enderecoSelecionado).subscribe(data => {
      this.mensagemService.mostrarMensagemSucesso('Endereço deletado com sucesso!')
      this.modalRef?.hide()
      this.deletarEnderecoPorId(this.enderecoSelecionado)
    })
  }

  private deletarEnderecoPorId(enderecoId: number): void {
    for (let i = 0; i < this.pessoaFullModel!.enderecos.length; i++) {
      if (this.pessoaFullModel?.enderecos[i].id == enderecoId) {
        this.pessoaFullModel.enderecos.splice(i, 1)

        break
      }
    }
  }
}
