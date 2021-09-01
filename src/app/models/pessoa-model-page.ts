import { PessoaModel } from './pessoa-model';
export interface PessoaModelPage{
  content: PessoaModel[]
  totalElements: number
  totalPages: number
}
