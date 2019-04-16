import { Injectable } from '@angular/core';
import { Contato } from './contatos';
import { AngularFireDatabase } from '@angular/fire/database';
import {map, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private db:AngularFireDatabase) { }//importando o banco de dados do firebase no contrutor da classe
//função de inserção no banco de dados
  insert(contato: Contato){
    this.db.list('contatos').push(contato)//inserindo no nó 'contatos' do firesase o novo contato
    .then((result: any)=>{    //Opcional, caso querer recuperar a Key do Objeto logo após ter salvado ele
      console.log(result.key);
    });
  }
  //função para atualizar registros
  update(contato: Contato, key:string){
    this.db.list('contatos').update(key, contato)//atualiza o nó contatos no firebase com a nova atualização dos dados
    .catch((error: any)=>{    //Retorna um erro, se houver
      console.error(error);
    });
  }

  //busca registros no firebase com regras do nome do campo
  getAllFilter(textoBusca:string, textoFiltro:string){
    return this.db.list('/contatos',q => q.orderByChild(textoFiltro).equalTo(textoBusca))//Busca no Campo tal o registro tal
    .snapshotChanges()//verifica todas as mudanças em tempo real
    .pipe(//tubo de mapeamento, monitoramento das mudanças feitas em tempo real
      map(changes =>{
        return changes.map(c=>({
                                  key: c.payload.key, //retorna a key dos objetos alt
                                  ... c.payload.val() // objeto JSON que retorna as mudanças de todos os outros dados contidos fora a key
                                }
                              )
                          );
      })
    );
  }
  //busca todos os registros no firebase
  getAll(){
    return this.db.list('/contatos',q => q.orderByChild('nome'))//consulta todos os registros de contato no banco de dados firebase
    .snapshotChanges()//verifica todas as mudanças em tempo real
    .pipe(//tubo de mapeamento, monitoramento das mudanças feitas em tempo real
      map(changes =>{
        return changes.map(c=>({
                                  key: c.payload.key, //retorna a key dos objetos alt
                                  ... c.payload.val() // objeto JSON que retorna as mudanças de todos os outros dados contidos fora a key
                                }
                              )
                          );
      })
    );
  }

//função de delete, onde acessa a chave no firebase para remoção
  delete(key:string){
    this.db.object(`contatos/${key}`).remove();
  }

  // getTotalRegistros() { //conta registros no banco de dados do firebase
  //   return this.db.list('/contatos')
  //     .snapshotChanges().pipe(
  //       map(changes => {
  //         return <number>changes.length;
  //       })
  //     )
  // }
}
