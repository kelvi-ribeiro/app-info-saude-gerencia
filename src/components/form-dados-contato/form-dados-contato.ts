import { Component, Input } from '@angular/core';
import { TelefoneService } from '../../services/domain/telefone.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { AlertController } from 'ionic-angular';

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
    private alertCtrl:AlertController) {
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
  alertRemoverTelefone(pessoaId){      
    let alert = this.alertCtrl.create({
      title:'Tem certeza ?',
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
