import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Contato} from '../shared/contatos';

@Injectable({
  providedIn: 'root'
})
export class ContatoSharedService {
//Classe utilizada para trabalhar a conexão do componente e Service no ato de editar

  private contatoSource = new BehaviorSubject({contato: null, key:''});//instancia um compotamento a ser manipulado
  currentContato = this.contatoSource.asObservable();//pega o objeto selecionado no template

  constructor() { }

  changeContato(contatoP: Contato, keyP: string){//recebe os objetos pegos pelo componente
    this.contatoSource.next({contato:contatoP, key:keyP})//Gerencia o próximo comportamento a ser realizado
  }
}
