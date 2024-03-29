import { Component, Input } from '@angular/core';
import { TipoSanguineoService } from '../../services/domain/tipo.sanguineo.service';
import { Events } from 'ionic-angular';
import { PacienteLinhaCuidadoService } from '../../services/domain/paciente.linha.cuidado.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'form-dados-medicos',
  templateUrl: 'form-dados-medicos.html'
})
export class FormDadosMedicosComponent {

  @Input() objectToUpdate;
  tiposSanguineo: any;
  pacienteLinhasCuidado: any;
  linhasCuidado: any;
  editouLinhaCuidado = false;
  formGroup : FormGroup;

  constructor(
    private tipoSanguineoService:TipoSanguineoService,
    private pacienteLinhaCuidadoService:PacienteLinhaCuidadoService,
    private linhaCuidadoService:LinhaCuidadoService,
    private events:Events,
    private alertCtrl:AlertController,
    private notificacoesService:NotificacoesService  ,
    private formBuilder: FormBuilder,       
    ) {  
      setTimeout(() => {              
        this.findAllPacienteLinhaCuidado();      
        this.findAllTipoSanguineo();
        this.findAllLinhaCuidado();  
        this.iniciarFormGroup();      
      }, 1);    
    }
    iniciarFormGroup(): any {      
        this.formGroup = this.formBuilder.group({
          tipoSanguineo: [
            this.objectToUpdate.tipoSanguineo.id, Validators.required],                                                      
        });              
  }
    
    findAllPacienteLinhaCuidado(){      
      this.pacienteLinhaCuidadoService.findAllByPacienteId(this.objectToUpdate.id)
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
    // Serve para remover a linha de cuidado do array, caso já exista um registro de
    // linha de cuidado para aquele paciente
    verifyIfExistisPacienteLinhasCuidado(linhaCuidadoId,pacienteLinhaCuidado){
      if(this.pacienteLinhasCuidado
        .find(el => el.linhaCuidado.id === linhaCuidadoId && linhaCuidadoId !== pacienteLinhaCuidado.linhaCuidado.id)){
        return true
      }else{
        return false
      }
    }
    onChange(field,value){              
      if(field === 'tipoSanguineo'){        
        this.objectToUpdate['tipoSanguineo']['id'] = value        
      }        
    }
    atualizar(){        
      this.events.publish('atualizar')
      if(this.editouLinhaCuidado){
        this.pacienteLinhasCuidado.forEach(element => {
          this.pacienteLinhaCuidadoService.update(element,this.objectToUpdate.id)
        });
      }
    }
    editarLinhaCuidado(pacienteLinhaCuidado,event){
      pacienteLinhaCuidado.linhaCuidado.id = event
      this.editouLinhaCuidado = true
    }
    verificaErrosForm():any{
      let hasErrors = false;
      Object.keys(this.formGroup.controls).find(element => {
        if(this.formGroup['controls'][element]['errors']){        
          this.notificacoesService.presentErrorValidationToast(element);        
          return hasErrors = true
        }
      });
      return hasErrors;
      
    }

    alertEscolhaNovaLinhaCuidado() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Escolha uma linha de cuidado')            
      this.linhasCuidado.forEach(linhaCuidado => {
        this.pacienteLinhasCuidado.forEach(pacienteLinhaCuidado =>{
          if(linhaCuidado.id === pacienteLinhaCuidado.linhaCuidado.id ){
            linhaCuidado.pacienteJaPossuiLinhaCuidado = true
            return
          }
        })
        if(!linhaCuidado.pacienteJaPossuiLinhaCuidado){
          alert.addInput({
            type: 'checkbox',
            label: linhaCuidado.nome,
            handler: () => { 
              alert.dismiss()
              this.alertConfirmationNewLinhaCuidado(linhaCuidado.id);
            }
          });
          alert.present()
        }
    });
  }
    alertConfirmationNewLinhaCuidado(linhaCuidadoId){
      let alert = this.alertCtrl.create({
        title:'Atenção!',
        message:'deseja adicionar nova linha de cuidado ? ',
        buttons: [
          {
            text: 'Sim',            
            handler: () => {
              const pacienteLinhaCuidado = {
                pacienteId:this.objectToUpdate.id,
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
            text: 'Não'          
          },
       
           ]
      });
      alert.present()
    }
    alertRemoverPacienteLinhaCuidado(pacienteLinhaCuidadoId){      
        let alert = this.alertCtrl.create({
          title:'Atenção!',
          message:'Deseja remover essa linha de cuidado ?',
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
  