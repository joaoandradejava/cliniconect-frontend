import { ProblemDetail } from './../utils/problem-detail';
import { MensagemService } from './../services/mensagem.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import "rxjs/operators";
import { catchError } from 'rxjs/operators';

@Injectable(
)
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private mensagemService: MensagemService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: any) => {
      let problemDetail: ProblemDetail = error.error
      if (problemDetail.errors != undefined && problemDetail.errors.length > 0) {
        this.mensagemService.mostrarMensagemError(problemDetail.errors[0].userMessage)
      } else {
        this.mensagemService.mostrarMensagemError(problemDetail.userMessage)
      }

      return throwError(error)
    }));
  }
}
