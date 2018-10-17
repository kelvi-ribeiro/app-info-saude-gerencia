import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-modal-perfil-paciente',
  templateUrl: 'modal-perfil-paciente.html',
})
export class ModalPerfilPacientePage {

  paciente = this.navParams.get('paciente');
  bucketBaseUrl = API_CONFIG.bucketBaseUrl;
  activeSegment = 'pessoais'
  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }
  closeModal(){
    this.viewCtrl.dismiss()
  }


}
