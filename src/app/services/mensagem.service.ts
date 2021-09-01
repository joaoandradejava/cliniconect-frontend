import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private toast: ToastrService) { }

  public mostrarMensagemSucesso(mensagem: string, duracao?: number | 3000): void {
    this.toast.clear()
    this.toast.success(mensagem, 'Sucesso!', { timeOut: duracao })
  }
  public mostrarMensagemError(mensagem: string, duracao?: number | 3000): void {
    this.toast.clear()
    this.toast.error(mensagem, 'Falha!', { timeOut: duracao })
  }
}
