import { Component, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginPage } from '../../pages/login/login';
import { API_CONFIG } from '../../config/api.config';
import { ModalController, Events } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';


@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent {  
    
  @Input() content
  @Input() nav 
  bucketBaseUrl = API_CONFIG.bucketBaseUrl; 
  constructor(    
    public storageService:StorageService,
    private modalCtrl:ModalController,
    public usuarioService:UsuarioService,    
    private events:Events) {
        
  }
  ionViewDidLoad(){
    if(!this.storageService.getUser()){      
      return
    }    
  }
  sair(){
    this.storageService.limparStorage()
    this.nav.setRoot(LoginPage)
  } 
  openPage(page){
    this.nav.setRoot(page)
  }
  openModalUpdate(){    
    let profileModal = this.modalCtrl.create('ModalPerfilPage',{objectToUpdate:this.storageService.getUser(),typeObjectToUpdate:'profissionalSaude'});
   profileModal.onDidDismiss(() => {     
     profileModal = null;
     this.events.publish('refresh:usuario')
   });
   profileModal.present();
 }   

}
