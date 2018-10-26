import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { NaturalidadeService } from '../../services/domain/naturalidade.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';

@Component({
  selector: 'form-dados-pessoais',
  templateUrl: 'form-dados-pessoais.html'
})
export class FormDadosPessoaisComponent {

  @Input()paciente
  naturalidades = []
  
  constructor(private events:Events,
              private naturalidadeService:NaturalidadeService,
              private pacienteService:PacienteService,
              private notificacoesService:NotificacoesService
              ) { 
                
                this.findAllNaturalidades()
  }
  
  onChange(field,value){        
    if(field === 'dataNascimento'){           
      if (Object.prototype.toString.call(new Date(value)) === "[object Date]") {        
        if (isNaN(new Date(value).getTime())) {  // d.valueOf() could also work
          return
        } else {                
            value = new Date(value).setDate(new Date(value).getDate() +1)             
            this.paciente['pessoa'][field] = value
        }
      } else {
        return
      }      
    }else{
      this.paciente['pessoa'][field] = value

    }    
  }
  convertTimeStampToDate(timestamp){
    const dataTratada = new Date(timestamp)
    return `${dataTratada.getFullYear()}-${dataTratada.getMonth() + 1 >= 10 ? '':0}${dataTratada.getMonth() + 1}-${dataTratada.getDate() >= 10 ? '':0}${dataTratada.getDate()}`
  }
  findAllNaturalidades(){
    this.naturalidadeService.findAll()
    .then(res =>{
      this.naturalidades = res;      
    })
  }
  editarPaciente(){        
    this.pacienteService.updatePaciente(this.paciente)
    .then(()=>{
      this.notificacoesService.presentToast('Sucesso ao atualizar paciente','',2500,'top')
      this.events.publish('close-modal')
      this.events.publish('listar:pacientes')
    })
    .catch((error)=>{
      console.log(error)
    })
  }
}
