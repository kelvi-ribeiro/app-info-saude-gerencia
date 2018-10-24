import { Component, Input } from '@angular/core';
import { TipoSanguineoService } from '../../services/domain/tipo.sanguineo.service';
import { Events } from 'ionic-angular';
import { PacienteLinhaCuidadoService } from '../../services/domain/paciente.linha.cuidado.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NotificacoesService } from '../../services/domain/notificacoes.service';

/**
 * Generated class for the FormDadosMedicosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-dados-medicos',
  templateUrl: 'form-dados-medicos.html'
})
export class FormDadosMedicosComponent {

  @Input() paciente;
  tiposSanguineo: any;
  pacienteLinhasCuidado: any;
  linhasCuidado: any;

  constructor(
    private tipoSanguineoService:TipoSanguineoService,
    private pacienteLinhaCuidadoService:PacienteLinhaCuidadoService,
    private linhaCuidadoService:LinhaCuidadoService,
    private events:Events,
    private alertCtrl:AlertController,
    private notificacoesService:NotificacoesService
    ) {  
      setTimeout(() => {              
        this.findAllPacienteLinhaCuidado();      
        this.findAllTipoSanguineo();
        this.findAllLinhaCuidado();        
      }, 50);    
    }
    
    findAllPacienteLinhaCuidado(){      
      this.pacienteLinhaCuidadoService.findAllByPacienteId(this.paciente.id)
      .then(res=>{
        this.pacienteLinhasCuidado = res;
      }) 
  
    }
    
    findAllTipoSanguineo(){      
      this.tipoSanguineoService.findAll()
      .then(res=>{
        this.tiposSanguineo = res;
      })       
    }
    findAllLinhaCuidado(){
      this.linhaCuidadoService.findAll()
      .then(res => {
        this.linhasCuidado = res
      })
    }
    onChange(field,value){              
        this.events.publish('editar-dados-medicos:paciente',field,value)            
    }

    alertEscolhaNovaLinhaCuidado() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Escolha uma linha de cuidado')      
      this.linhasCuidado.forEach(element => {
        alert.addButton({
          text: element.nome,
          handler: () => { 
            this.alertConfirmationNewLinhaCuidado(element.id);
          }
        });
      });
      alert.present()
    }
    alertConfirmationNewLinhaCuidado(linhaCuidadoId){
      let alert = this.alertCtrl.create({
        title:'Tem certeza ?',
        buttons: [
          {
            text: 'Sim',            
            handler: () => {
              const pacienteLinhaCuidado = {
                pacienteId:this.paciente.id,
                linhaCuidadoId:linhaCuidadoId                
              }
              
              this.pacienteLinhaCuidadoService.insertByPacienteIdAndLinhaCuidadoId(pacienteLinhaCuidado)
              .then(res => {                
                this.pacienteLinhasCuidado.push(res)                 
                this.notificacoesService.presentToast('Linha de cuidado adicionada',null,2000,'top')
              }).catch(()=>{
                this.notificacoesService.presentAlertErro();
              })
            }
          },
          {
            text: 'Não',
            handler: data => {
             
            },
          },
       
           ]
      });
      alert.present()
    }
    alertRemoverPacienteLinhaCuidado(pacienteLinhaCuidadoId){      
        let alert = this.alertCtrl.create({
          title:'Tem certeza ?',
          buttons: [
            {
              text: 'Sim',            
              handler: () => {
                this.pacienteLinhaCuidadoService.delete(pacienteLinhaCuidadoId)
                .then(() => {                
                 this.findAllPacienteLinhaCuidado()                 
                  this.notificacoesService.presentToast('Linha de cuidado Removida',null,2000,'top')
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
  