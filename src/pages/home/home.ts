import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioService } from '../../services/domain/usuario.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
              public navCtrl: NavController,
              private usuarioService:UsuarioService) {

  }
  ionViewDidLoad(){
    /* this.usuarioService.findAll()
    .then(res=>{
      console.log(res)
    }) */
  }

}
