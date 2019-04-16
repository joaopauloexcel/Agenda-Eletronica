import { Component, OnInit } from '@angular/core';
import {Contato} from '../shared/contatos';
import {ContatoService} from '../shared/contato.service';
import {ContatoSharedService} from '../shared/contato-shared.service';
import {Observable} from 'rxjs';//Em qualquer busca, o firebase retorna uma observable por sua conexão assícrona
import {ContatosComponent} from '../contatos/contatos.component';
import * as firebase from 'firebase';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {
  contatos: Observable<any>;
  contatosfiltrados: Observable<any>;
  validaFilter:boolean=false;
  textoBusca:string='';
  textoFiltro:string='';
  //positions: any = [];//variável utilizada para retornar o número de registros
//inicialização do contrutor já com as variáveis do componente e services de outras classes
  constructor(private contatoService: ContatoService, private contatoSharedService: ContatoSharedService, private contatosComponent: ContatosComponent) {
  }

  ngOnInit() {
    this.Filter();//função verificadora dos registros na tela
  }
//Função que chama a service de update
  edit(contato:Contato, key:string){
    this.contatoSharedService.changeContato(contato, key);//já passa para a service de conexão as informações do objeto a ser editado
    this.contatosComponent.validaForm=true;
  }

  delete(key:string){
    this.contatoService.delete(key);
  }
//Função responsável por recarregar os registros na tela
  Filter(){
    if(this.textoBusca!='' && this.textoFiltro!=''){//se houver preenchimento dos dois campos de busca, realiza o filtro
      this.contatos = this.contatoService.getAllFilter(this.textoBusca, this.textoFiltro);
    }
    else{//senão, recarrega os registros como um todo      
      this.contatos = this.contatoService.getAll();
    }
    this.contatosComponent.validaForm=false;//formulário de cadastro é iniciado como falso
  }
  // registros(){//Função que conecta a service que retorna a quantidade de registros do firebase
  //   this.contatoService.getTotalRegistros().subscribe(data => {  console.log(this.positions); this.positions = data;});
  //   return this.positions;
  // }
}
