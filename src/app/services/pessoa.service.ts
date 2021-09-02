import { PessoaInput } from './../models/pessoa-input';
import { Backend } from './../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  public buscarTodos(pagina: number, tamanhoDaPagina: number, nome: string, cpf: string): Observable<any> {
    return this.http.get(Backend.pessoas() + `?page=${pagina}&size=${tamanhoDaPagina}&nome=${nome}&cpf=${cpf}`)
  }
  public buscarPorId(pessoaId: number): Observable<any> {
    return this.http.get(Backend.pessoas() + `/${pessoaId}`)
  }
  public salvar(pessoaInput: PessoaInput): Observable<any> {
    return this.http.post(Backend.pessoas(), pessoaInput)
  }

  public atualizar(pessoaInput: PessoaInput, id: number): Observable<any> {
    return this.http.put(Backend.pessoas() + `/${id}`, pessoaInput)
  }

  public deletarPorId(id: number): Observable<any> {
    return this.http.delete(Backend.pessoas() + `/${id}`)
  }

}
