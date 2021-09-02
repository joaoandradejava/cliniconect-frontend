import { EnderecoInputComponent } from './endereco-input/endereco-input.component';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { PessoaInputComponent } from './pessoa-input/pessoa-input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './pessoas.component';

const routes: Routes = [
  { path: '', component: PessoasComponent },
  { path: 'pessoa-input', component: PessoaInputComponent },
  { path: 'pessoa-input/:id', component: PessoaInputComponent },
  { path: ':id/enderecos', component: EnderecosComponent },
  { path: ':id/enderecos/endereco-input', component: EnderecoInputComponent },
  { path: ':id/enderecos/endereco-input/:enderecoId', component: EnderecoInputComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
