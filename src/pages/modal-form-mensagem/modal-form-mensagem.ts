import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MensagemService } from '../../services/domain/mensagem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';

/**
 * Generated class for the ModalFormMensagemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-form-mensagem',
  templateUrl: 'modal-form-mensagem.html',
})
export class ModalFormMensagemPage {
  recipientObject = this.navParams.get('recipientObject')
  recipient =  this.navParams.get('recipient')
  formGroup : FormGroup
  constructor(
              public viewCtrl: ViewController, 
              public navCtrl: NavController,
              public navParams: NavParams,
              public mensagemService:MensagemService,
              private formBuilder: FormBuilder, 
              private storageService: StorageService, 
              private notificacoesService:NotificacoesService
              ) {
                  setTimeout(() => {                  
                    this.iniciarFormGroup()  
                  }, 1)    
      }
  

  iniciarFormGroup(): any {    
    this.formGroup = this.formBuilder.group({
      assunto: [
        '',
         Validators.compose([Validators.required, Validators.minLength(3),
          Validators.maxLength(130)])],                                                     
      mensagem: [
        '',
          Validators.compose([Validators.required, Validators.minLength(3),
          Validators.maxLength(500)])],      
          profissionalSaudeId: [
              this.storageService.getUser().id],      
          pacienteId: [
              this.recipient === 'paciente' ? this.recipientObject.id : null ],      
          linhaCuidadoId: [
            this.recipient === 'linhaCuidado' ? this.recipientObject.id : null ],      
          geral: [
                  this.recipient === 'todos' ? true : false ],      
    });        
  
}
closeModal(){    
  if(this.viewCtrl && !this.viewCtrl.readReady.closed){
    this.viewCtrl.dismiss()          
  }
}
  sendMessage(){
    if(this.verificaErrosForm()){
      return
    }
    this.mensagemService.insert(this.formGroup.value)
    .then(()=>{
      this.notificacoesService.presentToast('Mensagem Enviada',null,2500,'top')
      this.closeModal()
    })
    .catch(()=>{
      this.notificacoesService.presentAlertErro()
    })
  }
  verificaErrosForm():any{
    let hasErrors = false;
    Object.keys(this.formGroup.controls).forEach(element => {
      if(this.formGroup['controls'][element]['errors']){        
        this.notificacoesService.presentErrorValidationToast(element);        
        hasErrors = true
      }
    });
    return hasErrors;    
  }

}
