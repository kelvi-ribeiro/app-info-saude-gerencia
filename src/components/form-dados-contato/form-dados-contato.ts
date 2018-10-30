import { Component, Input } from '@angular/core';
import { TelefoneService } from '../../services/domain/telefone.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { AlertController, Events } from 'ionic-angular';

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

  @Input() paciente;
  telefones: any;

  constructor(
    private telefoneService:TelefoneService,
    private notificacoesService:NotificacoesService,
    private alertCtrl:AlertController,
    private events:Events) {
    setTimeout(() => {
      this.findAllByPessoaId()      
    }, 50)    
  }
  findAllByPessoaId(){
    this.telefoneService.findAllByPessoaId(this.paciente.pessoa.id)
    .then(res=>{
      this.telefones = res
    })
    .catch(()=>{
      this.notificacoesService.presentAlertErro()
    })
  }
  onChange(field,value){              
    if(field === 'email'){           
      this.paciente['pessoa']['email'] = value        
    }        
  }
  atualizarPaciente(){        
    this.events.publish('atualizar:paciente')          
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
            this.telefoneService.insertByPessoaId(data.numero,this.paciente.pessoa.id)
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
