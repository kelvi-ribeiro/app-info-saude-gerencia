import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Events, ActionSheetController } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { UsuarioService } from '../../services/domain/usuario.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';

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
              private actionSheetCtrl:ActionSheetController)
               {
  }

  ionViewDidLoad() {
   this.events.subscribe('editar-dados-pessoa:paciente',(field,value)=>{     
     this.paciente['pessoa'][field] = value
     console.log(this.paciente)
    })
    this.events.subscribe('editar-dados-pessoa-endereco:paciente',(field,value)=>{     
      this.paciente['pessoa']['endereco'][field] = value
      
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
  editarPaciente(){        
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
 
}
