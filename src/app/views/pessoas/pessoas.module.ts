import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasComponent } from './pessoas.component';
import { PessoaInputComponent } from './pessoa-input/pessoa-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { EnderecosComponent } from './enderecos/enderecos.component';
import { EnderecoInputComponent } from './endereco-input/endereco-input.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    PessoasComponent,
    PessoaInputComponent,
    EnderecosComponent,
    EnderecoInputComponent
  ],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons),
    NgxPaginationModule

  ],
  exports: [NgxPaginationModule]
})
export class PessoasModule { }
