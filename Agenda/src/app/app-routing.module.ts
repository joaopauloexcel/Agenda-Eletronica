import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ContatosComponent } from './contatos/contatos.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },//Quando a página carregar, vá para o template index
  { path: 'index', component: IndexComponent},//rota que direciona para o template index
  { path: 'contatos', component: ContatosComponent}//direciona para o template contatos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
