import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, Events } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { UsuarioService } from '../../services/domain/usuario.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { EnderecoService } from '../../services/domain/endereco.service';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';

@IonicPage()
@Component({
  selector: 'page-modal-perfil',
  templateUrl: 'modal-perfil.html',
})
export class ModalPerfilPage {

  objectToUpdate = this.navParams.get('objectToUpdate');
  typeObjectToUpdate = this.navParams.get('typeObjectToUpdate'); 
  bucketBaseUrl = API_CONFIG.bucketBaseUrl;
  activeSegment = 'pessoais'
  editMode: boolean;    
  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              private pacienteService:PacienteService,
              private profissionalSaude:ProfissionalSaudeService,
              private events:Events,
              private notificacoesService:NotificacoesService,
              private enderecoService:EnderecoService

              )
               {
  }

  ionViewDidLoad() {  
    this.events.subscribe('atualizar',()=>{
     if(this.typeObjectToUpdate === 'paciente'){
      this.atualizarPaciente()
     }else if(this.typeObjectToUpdate === 'profissionalSaude'){
      this.atualizarProfissionalSaude()
     }
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
    this.pacienteService.updatePaciente(this.objectToUpdate)
    .then(()=>{  
      this.notificacoesService.presentToast(`Sucesso ao atualizar o ${this.returnTypeObjectToSave()}`  ,'',2500,'top')
      this.closeModal()            
    })
    .catch((error)=>{
      
    })
  }
  atualizarProfissionalSaude(){        
    this.profissionalSaude.update(this.objectToUpdate)
    .then(()=>{  
      this.notificacoesService.presentToast(`Sucesso ao atualizar o ${this.returnTypeObjectToSave()}`  ,'',2500,'top')
      this.closeModal()            
    })
    .catch((error)=>{
      
    })
  }
  atualizarEnderecoPessoa(){    
    this.enderecoService.update(this.objectToUpdate.pessoa.endereco)    
    .then(()=>{  
      this.notificacoesService.presentToast(`Sucesso ao atualizar o ${this.returnTypeObjectToSave()}`,'',2500,'top')
      this.closeModal()            
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  returnTypeObjectToSave(){
    if(this.typeObjectToUpdate === 'paciente'){
      return 'Paciente'
    }else if(this.typeObjectToUpdate === 'profissionalSaude'){
      return 'Profissional de saúde'
    }
  }     
}
