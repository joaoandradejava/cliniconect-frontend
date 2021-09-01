import { PessoaInputComponent } from './pessoa-input/pessoa-input.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoasComponent } from './pessoas.component';

const routes: Routes = [{ path: '', component: PessoasComponent }, { path: 'pessoa-input', component: PessoaInputComponent }, { path: 'pessoa-input/:id', component: PessoaInputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
