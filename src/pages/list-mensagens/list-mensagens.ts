import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { InteracaoService } from '../../services/domain/interacao.service';

/**
 * Generated class for the ListMensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-mensagens',
  templateUrl: 'list-mensagens.html',
})
export class ListMensagensPage {
  pages;
  pageAtual = 0;
  totalPages;  
  mensagens = [];
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private mensagemService:MensagemService,
              private notificacoesService:NotificacoesService,
              private pacienteService:PacienteService,
              private intercaoService:InteracaoService) {
  }

  ionViewDidLoad() {
    this.findAllMensagens()
  }

  findAllMensagens(){
    this.mensagemService.findAllPageable(this.pageAtual)
    .then(res=>{            
      res.content.forEach(element => {        
        if(element.paciente){
          element.totalMensagemEnviado = 1         
        }else{
          this.pacienteService
        .showNumbersPacienteByLinhaCuidado(element.linhaCuidado ? element.linhaCuidado.id : 0)
        .then(res=>{          
          element.totalMensagemEnviado = res;          
          })          
        }
        this.intercaoService.showNumberMessageRed(element.id)
        .then(numberOfMessageRead =>{
            element.numberOfMessageRead = numberOfMessageRead              
          })
        
        this.mensagens = res.content       
      });
      //this.removerPacienteDuplicado();
      
      /* this.pacientes = this.pacientes.sort(function (a, b) {
        var textA = a.pessoa.nome.toUpperCase(); // ORDENANDO POR NOME
        var textB = b.pessoa.nome.toUpperCase();
      
        return textA.localeCompare(textB);
      }); */
      this.totalPages = res.totalPages   
      if(res.content.length === 0){
        //this.notificacoesService.presentToast('Nenhum paciente encontrado','toast-attention',2000,'top')
        return        
      }
      this.pages =  Array(res.totalPages).fill(res.totalPages).map((x,i)=>  i) /* Array(res.totalPages).fill(res.totalPages).map((x,i)=>i); // [0,1,2,3,4] */
      this.pages = this.pages.filter(res => res<=this.pageAtual+5 && res>=this.pageAtual-5)
    }).catch((error)=>{
      console.log(error)
      this.notificacoesService.presentAlertErro();
    })
  }  
  zerarPagination(){
    this.pageAtual = 0;
  }

  nextPage(){
    if(this.pageAtual === this.totalPages || this.totalPages === 1) return
    this.pageAtual++;
    this.findAllMensagens()
  }
  previousPage(){
    if(this.pageAtual === 0 || this.totalPages === 1) return
    this.pageAtual--;
    
    this.findAllMensagens()
  }
  changePage(clickedPage){
    if(this.pageAtual === clickedPage) return 
    this.pageAtual = clickedPage
    this.findAllMensagens()
  }
  exibirDestinatario(mensagem){
    if(mensagem.linhaCuidado){
      return `Linha de cuiado: ${mensagem.linhaCuidado.nome}`
    }else if(mensagem.paciente){
      return `Paciente: ${mensagem.paciente.pessoa.nome}`
    }else{
      return 'Todos'
    }
  }

}
