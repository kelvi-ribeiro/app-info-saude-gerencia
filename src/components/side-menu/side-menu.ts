import { Component, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginPage } from '../../pages/login/login';
import { API_CONFIG } from '../../config/api.config';
import { ModalController, Events, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';
import { AuthService } from '../../services/auth.service';


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
    public alertCtrl:AlertController, 
    public authService:AuthService,
    private events:Events) {
        
  }
  ionViewDidLoad(){
    if(!this.storageService.getUser()){      
      return
    }    
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

 alertCertezaSair() {
  let alert = this.alertCtrl.create({
    title: "Logout!",
    message: "Você deseja se desconectar ?",
    enableBackdropDismiss: false,
    buttons: [
      {
        text: "Sim",
        handler: () => {
          this.authService.logout();
          this.nav.setRoot(LoginPage)
        }
      },
      {
        text: "Não",
        handler: () => {
          this.storageService.setEmail(null);
        }
      }
    ]
  });
  alert.present();
}

}
