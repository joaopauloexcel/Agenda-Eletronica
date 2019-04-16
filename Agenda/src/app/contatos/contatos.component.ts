import { Component, OnInit } from '@angular/core';
import {Contato} from '../shared/contatos';//importe das classes e services de contatos para utilização
import {ContatoService} from '../shared/contato.service';
import {ContatoSharedService} from '../shared/contato-shared.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  contato: Contato;
  key: string = '';
  validaForm:boolean=false;//valida o formúlario de cadastro

  constructor(private contatoService: ContatoService, private contatoSharedService: ContatoSharedService) {}

  ngOnInit() {
    this.contato = new Contato();//instancia já um objeto que ficará aguardando alguma manipulação    
    //Já instancia campos para uma possível alteração.
    this.contatoSharedService.currentContato.subscribe(data =>{//Chama classe de conexão twoWay "ContatoSharedService"
      if(data.contato && data.key){//se contém um objeto e uma key na tela
        this.contato = new Contato();//instancia novo objeto
        this.contato.nome = data.contato.nome;//parâmetros da classe recebe instantaneamente o que está no formulário e vice-versa.
        this.contato.telefone = data.contato.telefone;
        this.contato.endereco = data.contato.endereco;
        this.key = data.key;
        this.validaForm=false;//formulário de cadastro deve ser iniciado invisível
      }
    })
  }
//função do botão "Salvar" do formulário de cadastro
  onSubmit(){
    if(this.key){//se há alguma chave sendo enviada, faça a função de update
      this.contatoService.update(this.contato,this.key);
    }
    else{//senão, é um novo registro a ser criado
      this.contatoService.insert(this.contato);
    }
    this.contato = new Contato(); //instancia novamente um novo objeto aguardando alguma solicitação
    this.validaForm=false;//fecha o formulário de cadastro
  }
//Função do botão "Novo +"
  newContato(){
    this.validaForm=true; //Validação do formulário para o mesmo constar na tela.
    this.key=null;  //limpa campos do formulário, isso para limpa-lo caso tenha tentado fazer alguma alteração sem finaliza-la.
    this.contato.nome=null;
    this.contato.telefone=null;
    this.contato.endereco=null;
  }
}
