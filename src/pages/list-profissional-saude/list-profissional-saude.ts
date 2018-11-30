import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { API_CONFIG } from '../../config/api.config';
import { PessoaService } from '../../services/domain/pessoa.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../../services/storage.service';


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
  bucketBaseUrl = API_CONFIG.bucketBaseUrl;

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public profissionalSaudeService:ProfissionalSaudeService,
              public notificacoesService:NotificacoesService,
              private actionSheetCtrl:ActionSheetController,
              private pessoaService:PessoaService,
              public usuarioService:UsuarioService,
              private modalCtrl:ModalController,
              private alertCtrl:AlertController,
              private storageService:StorageService) {
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
    const loading = this.notificacoesService.presentLoadingDefault('Carregando...')
    this.profissionalSaudeService.findByName(this.nomePessoa,this.page)
    .then(res =>{
      loading.dismiss()
      this.profissionaisSaude = res.content          
      this.totalPages = res.totalPages   
      if(res.content.length === 0){
        this.notificacoesService.presentToast('Nenhum profissional de saúde encontrado','toast-attention',2000,'top')
        return        
      }
      this.pages =  Array(res.totalPages).fill(res.totalPages).map((x,i)=>  i) /* Array(res.totalPages).fill(res.totalPages).map((x,i)=>i); // [0,1,2,3,4] */
      this.pages = this.pages.filter(res => res<=this.pageAtual+5 && res>=this.pageAtual-5)
    }).catch(()=>{
      loading.dismiss()
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
  openModalUpdate(profissionalSaude){    
    let profileModal = this.modalCtrl.create('ModalPerfilPage',{objectToUpdate:profissionalSaude,typeObjectToUpdate:'profissionalSaude'});
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

  adicionarPerfilAdmin(pessoaId){
    this.pessoaService.addPerfil(pessoaId,1)
    .then(()=>{
      this.findAllProfissionaisSaude()
    })
  }
  deletarPerfilAdmin(pessoaId){
    this.pessoaService.deletePerfil(pessoaId,1)
    .then(()=>{
      this.findAllProfissionaisSaude()
    })
  }
  openActions(profissionalSaude) {
    let alert = this.alertCtrl.create({
      title: 'Ações',      
      buttons: [
        {
          text: 'Visualizar / Editar Profissional de Saúde',          
          handler: () => {
            this.openModalUpdate(profissionalSaude)
          }
        },       
        {
          text: 'Mudar perfil para Gerente',
          handler: () => {            
            this.adicionarPerfilAdmin(profissionalSaude.pessoa.id)
          }
        },
        {
          text: 'Mudar perfil para Profissional de Saúde',
          handler: () => {            
            this.deletarPerfilAdmin(profissionalSaude.pessoa.id)
          }
        },
        {
          text: 'Fechar',
          handler: () => {
            
          }
        }
      ]
    });
    if(profissionalSaude.id === this.storageService.getUser().id){
      alert.present()
      alert.data.buttons = alert.data.buttons.filter((el,index) =>{
        if(index != 1 && index != 2){
          return el
        }    
      }) 
      alert.data.buttons = alert.data.buttons.reverse()   
      return
    }
    
    if(this.usuarioService.verificaTemPermissaoAdmin(profissionalSaude.pessoa.perfis)){
      alert.data.buttons = alert.data.buttons.filter((el,index) =>{
        if(index != 1){
          return el
        }    
      })
    }else{
      alert.data.buttons = alert.data.buttons.filter((el,index) =>{
        if(index != 2){
          return el
        }    
      })
    }
      
    
    alert.present();
  }
}
