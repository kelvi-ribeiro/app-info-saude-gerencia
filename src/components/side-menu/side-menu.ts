import { Component, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoginPage } from '../../pages/login/login';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the SideMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent {  
    
  @Input() content
  @Input() nav 
  bucketBaseUrl = API_CONFIG.bucketBaseUrl; 
  constructor(    
    public storageService:StorageService) {
        
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

}
