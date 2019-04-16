import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ContatosComponent } from './contatos/contatos.component';
import {environment} from '../environments/environment'//arquivo de configuração do firebase
import {AngularFireModule} from '@angular/fire' //Faz a inicialização do app
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ListaComponent } from './lista/lista.component' //integração de dados Angular/Firebase


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ContatosComponent,
    ListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),//inicialização do firebase no projeto
    AngularFireDatabaseModule, //modulo da integração angular/firebase
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
