import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Events } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { UsuarioService } from '../../services/domain/usuario.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { EnderecoService } from '../../services/domain/endereco.service';

@IonicPage()
@Component({
  selector: 'page-modal-perfil-paciente',
  templateUrl: 'modal-perfil-paciente.html',
})
export class ModalPerfilPacientePage {

  paciente = this.navParams.get('paciente');
  bucketBaseUrl = API_CONFIG.bucketBaseUrl;
  activeSegment = 'pessoais'
  editMode: boolean;    
  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              private pacienteService:PacienteService,
              private events:Events,
              private notificacoesService:NotificacoesService,
              private enderecoService:EnderecoService

              )
               {
  }

  ionViewDidLoad() { 
 
    this.events.subscribe('atualizar:paciente',()=>{
     this.atualizarPaciente()
    })
    this.events.subscribe('atualizar:endereco',()=>{
      this.atualizarEnderecoPessoa()
     })
  }
  closeModal(){
    this.viewCtrl.dismiss()
    
  }
  setEditMode(){
    if(this.editMode){
      this.editMode = false      
      return
    } 
    this.editMode = true
  }
  atualizarPaciente(){        
    this.pacienteService.updatePaciente(this.paciente)
    .then(()=>{  
      this.notificacoesService.presentToast('Sucesso ao atualizar paciente','',2500,'top')
      this.closeModal()      
      this.events.publish('listar:pacientes')
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  atualizarEnderecoPessoa(){
    console.log(this.paciente.pessoa.endereco)
    this.enderecoService.update(this.paciente.pessoa.endereco)    
    .then(()=>{  
      this.notificacoesService.presentToast('Sucesso ao atualizar paciente','',2500,'top')
      this.closeModal()      
      this.events.publish('listar:pacientes')
    })
    .catch((error)=>{
      console.log(error)
    })
  }
 
}
