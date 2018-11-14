import { Component, ViewChild, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, ActionSheetController, Events } from 'ionic-angular';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';
import { API_CONFIG } from '../../config/api.config';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';
import { LoginPage } from '../login/login';


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
  pacientesOnline: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pacienteService:PacienteService,
    private linhaCuidadoService:LinhaCuidadoService,
    private notificacoesService:NotificacoesService, 
    public usuarioService:UsuarioService,   
    private modalCtrl:ModalController,
    private actionSheetCtrl:ActionSheetController,
    private storageService:StorageService,
    private events:Events,
    ) {
  }

  ionViewDidLoad() {        
    if(!this.storageService.getUser()){
      this.navCtrl.setRoot(LoginPage)
      return
    }   
    this.events.subscribe('listar:pacientes',() => {
      this.findPacientes()
    })
    this.slidesLinhasCuidado.lockSwipes(true)
    this.findPacientes()  
    this.findLinhasCuidado()     
    this.showOnlinePacientes()
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

  showToastExplanation(){
    this.notificacoesService.presentToast('Quantidade de pacientes online','toast-attention',2000,'top')
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
  showOnlinePacientes(){
    this.pacienteService.showOnlinePacientes()
    .then(pacientesOnline =>{
      this.pacientesOnline = pacientesOnline;
      setTimeout(() => {
        this.showOnlinePacientes()
      }, 15000);
    })
    .catch(() => {
      this.notificacoesService.presentAlertErro()
    })
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
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({          
      buttons: [
        {
          text: 'Adicionar Paciente',             
          icon:'add-circle',         
          handler:()=>{
            this.openModalCreate();
          }          
        },
        {
          text: 'Enviar Mensagem para esta linha de cuidado',
          icon:'mail',                     
          handler:()=>{
            this.openModalCreateMessage(
              this.linhasCuidado.find(el => el.id === this.linhaCuidadoId),'linhaCuidado')
          }
        },
        {
          text: 'Enviar Mensagem para todos pacientes ativos',
          icon:'mail',    
          handler:()=>{
            this.openModalCreateMessage(null,'todos')
          }                 
        },
        {        
      }
    ]
    });
    if(this.slidesLinhasCuidado.getActiveIndex() === 0){
      actionSheet.data.buttons.splice(1,1)
    }
    actionSheet.present();
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
    this.pacienteService.findPessoaByAnyField(this.linhaCuidadoId,this.campoPesquisa,this.pageAtual)
    .then(res=>{            
      this.pacientes = res.content      
      //this.removerPacienteDuplicado();
      
      /* this.pacientes = this.pacientes.sort(function (a, b) {
        var textA = a.pessoa.nome.toUpperCase(); // ORDENANDO POR NOME
        var textB = b.pessoa.nome.toUpperCase();
      
        return textA.localeCompare(textB);
      }); */
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
  removerPacienteDuplicado(){
    const firstElement = this.pacientes[0]
    let temp = firstElement.id
      this.pacientes = this.pacientes.filter((element) => {
        if(element.id !== temp){
            return element
          }  
          temp = element.id
      });
    this.pacientes.unshift(firstElement)
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
  openModalUpdate(paciente){    
    let profileModal = this.modalCtrl.create('ModalPerfilPage',{objectToUpdate:paciente,typeObjectToUpdate:'paciente'});
   profileModal.onDidDismiss(() => {
     this.findPacientes()
     profileModal = null;
   });
   profileModal.present();
 } 

 openModalCreate(){    
  let profileModal = this.modalCtrl.create('FormModalObjectToSavePage',{typeObjectToSave:'paciente'});
 profileModal.onDidDismiss(() => {
   
 });
 profileModal.present();
} 
openModalCreateMessage(recipientObject,recipient){    
  let profileModal = this.modalCtrl.create('ModalFormMensagemPage',
  {recipientObject:recipientObject,recipient:recipient});
 profileModal.onDidDismiss(() => {
  
 });
 profileModal.present();
} 
  
}
