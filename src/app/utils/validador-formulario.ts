import { FormGroup } from '@angular/forms';
export class ValidadorFormulario {

  public static pegarCssFormulario(formulario: FormGroup, label: string): any {
    return { 'is-invalid': formulario.get(label)?.invalid && formulario.get(label)?.touched, 'is-valid': formulario.get(label)?.valid && formulario.get(label)?.touched }
  }

  public static campoObrigatorio(label: string): string {
    return `Preencha o campo ${label}!`
  }

  public static campoInvalido(label: string): string {
    return `${label} inválido!`
  }

  public static campoTamanhoMaximoEMinimo(label: string, maximo: number, minimo: number): string {
    return `O campo ${label} tem que ter entre ${maximo} á ${minimo} caracteres!`
  }

}
