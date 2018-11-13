import { Component, Input } from '@angular/core';
import { TelefoneService } from '../../services/domain/telefone.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { AlertController, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the FormContatoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-dados-contato',
  templateUrl: 'form-dados-contato.html'
})
export class FormDadosContatoComponent {

  @Input() objectToUpdate;
  telefones: any;
  formGroup : FormGroup;
  constructor(
    private telefoneService:TelefoneService,
    private notificacoesService:NotificacoesService,
    private alertCtrl:AlertController,
    private formBuilder: FormBuilder,                  
    private events:Events) {
    setTimeout(() => {
      this.findAllByPessoaId()    
      this.iniciarFormGroup()  
    }, 1)    
  }
  iniciarFormGroup(): any {    
      this.formGroup = this.formBuilder.group({
        email: [
          this.objectToUpdate.pessoa.email,
           Validators.compose([Validators.required, Validators.minLength(3),
            Validators.maxLength(50),Validators.email])],                                                     
      });        
    
}
  findAllByPessoaId(){
    this.telefoneService.findAllByPessoaId(this.objectToUpdate.pessoa.id)
    .then(res=>{
      this.telefones = res
    })
    .catch(()=>{
      this.notificacoesService.presentAlertErro()
    })
  }
  onChange(field,value){              
    if(field === 'email'){           
      this.objectToUpdate['pessoa']['email'] = value        
    }        
  }
  atualizar(){       
    if(this.verificaErrosForm()){
      return
    }
    
    this.events.publish('atualizar',this.objectToUpdate)
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
  presentPromptAdicionarTelefone() {
    let alert = this.alertCtrl.create({
      title: 'Número de telefone',
      inputs: [
        {
          name: 'numero',
          placeholder: 'ex: 2127614324',
          type:'number'
        },       
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',          
        },
        {
          text: 'Adicionar',
          handler: data => {            
            const telefoneDto = {
              pessoaId:this.objectToUpdate.pessoa.id,
              numero:data.numero
            }
            this.telefoneService.insert(telefoneDto)
            .then(()=>{
              this.notificacoesService.presentToast('Telefone Adicionado',null,2000,'top')
              this.findAllByPessoaId()
            })
          }
        }
      ]
    });
    alert.present();
  }
  alertRemoverTelefone(pessoaId){      
    let alert = this.alertCtrl.create({
      title:'Alerta',
      message:'Deseja mesmo remover esse telefone ?',
      buttons: [
        {
          text: 'Sim',            
          handler: () => {
            this.telefoneService.delete(pessoaId)
            .then(() => {                
             this.findAllByPessoaId()                 
              this.notificacoesService.presentToast('Telefone removido',null,2000,'top')
            }).catch(()=>{
              this.notificacoesService.presentAlertErro();
            })
          }
        },
        {
          text: 'Não',             
        },
     
         ]
    });
    alert.present()
  }    
}
