export class Backend {
  private static get servidor(): string {
    return 'https://cliniconect-backend.herokuapp.com/'
  }

  public static pessoas(): string {
    return `${this.servidor}pessoas`
  }
}
