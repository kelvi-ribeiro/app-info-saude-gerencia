import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-list-pacientes',
  templateUrl: 'list-pacientes.html',
})
export class ListPacientesPage {
  campoPesquisa:string;
  pacientes = [];
  pages;
  pageAtual = 0;
  totalPages;  
  linhasCuidado = [];
  linhaCuidadoId;
  bucketBaseUrl = API_CONFIG.bucketBaseUrl;
  
  @ViewChild('slidesLinhasCuidado') slidesLinhasCuidado: Slides;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pacienteService:PacienteService,
    private linhaCuidadoService:LinhaCuidadoService,
    private notificacoesService:NotificacoesService,    
    private modalCtrl:ModalController
    ) {
  }

  ionViewDidLoad() {    
    this.slidesLinhasCuidado.lockSwipes(true)
    this.findPacientes()  
    this.findLinhasCuidado()     
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
    this.findPacientes()
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
    this.findPacientes() 
  }
  findLinhasCuidado(){
    this.linhaCuidadoService.findAll()
    .then(res=>{
      this.linhasCuidado = res
      this.linhasCuidado.unshift({id:0,nome:'Todas',caminhoImagem:'assets/imgs/todas.png'});
    })
  }
  changePage(clickedPage){
  if(this.pageAtual === clickedPage) return 
  this.pageAtual = clickedPage
  this.findPacientes()
  }

  nextPage(){
    if(this.pageAtual === this.totalPages || this.totalPages === 1) return
    this.pageAtual++;
    this.findPacientes()
  }
  previousPage(){
    if(this.pageAtual === 0 || this.totalPages === 1) return
    this.pageAtual--;
    
    this.findPacientes()
  }
  openActions(paciente){
    paciente.actionOpened =  paciente.actionOpened ? false : true
  }

  findPacientes(){
    this.pacienteService.findPessoaByAnyField(this.campoPesquisa,this.linhaCuidadoId,this.pageAtual)
    .then(res=>{      
      this.pacientes = res.content;             
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
  returnPathImageByLinhaCuidadoId(){
    if(this.linhasCuidado.length === 0){return false}    
      if(this.linhasCuidado.length <= this.slidesLinhasCuidado.getActiveIndex()){
        return this.linhasCuidado[this.linhasCuidado.length -1].caminhoImagem
      }
      const linhaCuidadoAtiva = this.linhasCuidado[this.slidesLinhasCuidado.getActiveIndex()]    
      if(linhaCuidadoAtiva !== undefined){
        return linhaCuidadoAtiva.caminhoImagem
      }    
    }  
  zerarPagination(){
    this.pageAtual = 0;
  }
  openModal(paciente){    
    let profileModal = this.modalCtrl.create('ModalPerfilPacientePage',{paciente:paciente});
   profileModal.onDidDismiss(data => {
     
   });
   profileModal.present();
 }
  
}
