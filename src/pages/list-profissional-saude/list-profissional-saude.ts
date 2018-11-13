import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';


@IonicPage()
@Component({
  selector: 'page-list-profissional-saude',
  templateUrl: 'list-profissional-saude.html',
})
export class ListProfissionalSaudePage {
  nomePessoa:string;
  profissionaisSaude = [];
  page = 0;
  pageAtual = 0;
  totalPages: any;
  pages: number[];

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public profissionalSaudeService:ProfissionalSaudeService,
              public notificacoesService:NotificacoesService,
              private actionSheetCtrl:ActionSheetController,
              private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    this.findAllProfissionaisSaude()
  }
  searchProfissinalSaude(){
    this.zerarPagination();
    this.findAllProfissionaisSaude()
  }

  zerarPagination(){
    this.pageAtual = 0;
  }

  changePage(clickedPage){
    if(this.pageAtual === clickedPage) return 
    this.pageAtual = clickedPage
    this.findAllProfissionaisSaude()
    }
    openActions(profissionalSaude){
      profissionalSaude.actionOpened =  profissionalSaude.actionOpened ? false : true
    }  
 
    nextPage(){
      if(this.pageAtual === this.totalPages || this.totalPages === 1) return
      this.pageAtual++;
      this.findAllProfissionaisSaude()
    }
    previousPage(){
      if(this.pageAtual === 0 || this.totalPages === 1) return
      this.pageAtual--;
      
      this.findAllProfissionaisSaude()
    }
  findAllProfissionaisSaude(){
    this.profissionalSaudeService.findByName(this.nomePessoa,this.page)
    .then(res =>{
      this.profissionaisSaude = res.content      
    
      this.totalPages = res.totalPages   
      if(res.content.length === 0){
        this.notificacoesService.presentToast('Nenhum profissional de saúde encontrado','toast-attention',2000,'top')
        return        
      }
      this.pages =  Array(res.totalPages).fill(res.totalPages).map((x,i)=>  i) /* Array(res.totalPages).fill(res.totalPages).map((x,i)=>i); // [0,1,2,3,4] */
      this.pages = this.pages.filter(res => res<=this.pageAtual+5 && res>=this.pageAtual-5)
    }).catch(()=>{
      this.notificacoesService.presentAlertErro();
    })
  }
  openModalCreate(){    
    let profileModal = this.modalCtrl.create('FormModalObjectToSavePage',{typeObjectToSave:'profissionalSaude'});
   profileModal.onDidDismiss(() => {
     this.findAllProfissionaisSaude()
   });
   profileModal.present();
  } 
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({          
      buttons: [
        {
          text: 'Adicionar Profissional de Saúde',             
          icon:'add-circle',         
          handler:()=>{
            this.openModalCreate();
          }          
        },   
        {
          text: 'Cancelar',             
          icon:'close',                   
        },      
    
    ]
    }); 
    actionSheet.present();
  }

}
