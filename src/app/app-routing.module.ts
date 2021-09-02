import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: 'pessoas', pathMatch: 'full' }, { path: 'pessoas', loadChildren: () => import('./views/pessoas/pessoas.module').then(m => m.PessoasModule) }, {path: '**', redirectTo: 'pessoas'} ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
