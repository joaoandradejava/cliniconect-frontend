import { EnderecoModel } from './endereco-model';
export interface PessoaFullModel{
  id: number
  nome: string
  cpf: string
  celular: string
  email: string
  dataNascimento: string
  enderecos: EnderecoModel[]
}
