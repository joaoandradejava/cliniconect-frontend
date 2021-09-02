import { Backend } from './../utils/backend';
import { EnderecoInput } from './../models/endereco-input';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PessoaEnderecoService {

  constructor(private http: HttpClient) { }

  public buscarEnderecoDaPessoa(pessoaId: number, enderecoId: number): Observable<any> {
    return this.http.get(Backend.pessoasEnderecos(pessoaId) + `/${enderecoId}`)
  }

  public salvar(enderecoInput: EnderecoInput, pessoaId: number): Observable<any> {
    return this.http.post(Backend.pessoasEnderecos(pessoaId), enderecoInput)
  }

  public atualizar(enderecoInput: EnderecoInput, pessoaId: number, enderecoId: number): Observable<any> {
    return this.http.put(Backend.pessoasEnderecos(pessoaId) + `/${enderecoId}`, enderecoInput)
  }

  public deletar(pessoaId: number, enderecoId: number): Observable<any> {
    return this.http.delete(Backend.pessoasEnderecos(pessoaId) + `/${enderecoId}`)
  }

  public buscarEnderecoPeloCep(cep: string): Observable<any>{
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}
