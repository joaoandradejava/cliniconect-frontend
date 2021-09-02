export class Backend {

  private static servidorLocal: string = 'http://localhost:8080/'
  private static servidorProducao: string = 'https://cliniconect-backend.herokuapp.com/'

  private static get servidor(): string {
    return this.servidorProducao
  }

  public static pessoas(): string {
    return `${this.servidor}pessoas`
  }

  public static pessoasEnderecos(pessoaId: number): string {
    return `${this.servidor}pessoas/${pessoaId}/enderecos`
  }
}
