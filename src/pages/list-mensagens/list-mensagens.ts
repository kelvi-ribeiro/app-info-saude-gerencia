import { Component, ViewChild, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';

@IonicPage()
@Component({
  selector: 'page-list-mensagens',
  templateUrl: 'list-mensagens.html',
})
export class ListMensagensPage {
  mensagens = [];
  campoPesquisa:string;
  pages;
  pageAtual = 0;
  totalPages;  
  linhasCuidado = [];
  linhaCuidadoId; 
  @ViewChild('slidesLinhasCuidado') slidesLinhasCuidado: Slides;
  
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              private mensagemService:MensagemService,
              private notificacoesService:NotificacoesService, 
              private linhaCuidadoService:LinhaCuidadoService,
              ) {
  }

  ionViewDidLoad() {
    this.slidesLinhasCuidado.lockSwipes(true)
    this.findAllMensagens()
    this.findLinhasCuidado()
  }

  findAllMensagens(){
    this.mensagemService.findMensagemByAnyField(this.linhaCuidadoId,this.campoPesquisa,this.pageAtual)
    .then(res=>{            
      this.mensagens= res.content      
      
      this.totalPages = res.totalPages   
      if(res.content.length === 0){
        this.notificacoesService.presentToast('Nenhum paciente encontrado','toast-attention',2000,'top')
        return        
      }
      this.pages =  Array(res.totalPages).fill(res.totalPages).map((x,i)=>  i) /* Array(res.totalPages).fill(res.totalPages).map((x,i)=>i); // [0,1,2,3,4] */
      this.pages = this.pages.filter(res => res<=this.pageAtual+5 && res>=this.pageAtual-5)
    }).catch(()=>{      
      this.notificacoesService.presentAlertErro();
    })
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
         this.prevSlide()
      }
      else if (event.key === 'ArrowRight') {
        this.nextSlide()
      }
  }

  findLinhasCuidado(){
    this.linhaCuidadoService.findAll()
    .then(res=>{
      this.linhasCuidado = res
      this.linhasCuidado.unshift({id:0,nome:'Todas',caminhoImagem:'assets/imgs/todas.png'});
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

  nextSlide(){
    this.slidesLinhasCuidado.lockSwipes(false)
    this.slidesLinhasCuidado.slideNext()
    this.slidesLinhasCuidado.lockSwipes(true)
  }
  prevSlide(){
    this.slidesLinhasCuidado.lockSwipes(false)
    this.slidesLinhasCuidado.slidePrev()
    this.slidesLinhasCuidado.lockSwipes(true)
  }

  searchPaciente(){
    this.zerarPagination();
    this.findAllMensagens()
  }

  slideChanged(){
    this.zerarPagination()
    if(this.slidesLinhasCuidado.getActiveIndex() === 0){
      this.linhaCuidadoId = ''
    }
    
    if(this.slidesLinhasCuidado.getActiveIndex()  === this.linhasCuidado.length){
      return
    }
    this.linhaCuidadoId = this.slidesLinhasCuidado.getActiveIndex() 
    this.findAllMensagens() 
  }

  changePage(clickedPage){
    if(this.pageAtual === clickedPage) return 
    this.pageAtual = clickedPage
    this.findAllMensagens()
  }
  exibirDestinatario(mensagem){
    if(mensagem.linhaCuidadoId){
      return `Linha de cuiado: ${mensagem.nomeLinhaCuidado}`
    }else if(mensagem.pacienteId){
      return `Paciente: ${mensagem.nomePaciente}`
    }else{
      return 'Todos'
    }
  }

}
