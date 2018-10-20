import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the DadosPessoaisComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'dados-pessoais',
  templateUrl: 'dados-pessoais.html'
})
export class DadosPessoaisComponent {

  @Input() paciente;
  @Input()editMode = false;
  date = new Date()

  constructor(private events:Events) { 
  }
  onChange(field,value){
    if(field === 'dataNascimento'){
      value = new Date(value)
    }
    this.events.publish('editar-dados-pessoa:paciente',field,value)      
  }
  convertTimeStampToDate(timestamp){
    const dataTratada = new Date(timestamp)
    return `${dataTratada.getFullYear()}-${dataTratada.getMonth() + 1 >= 10 ? '':0}${dataTratada.getMonth() + 1}-${dataTratada.getDate() >= 10 ? '':0}${dataTratada.getDate()}`
  }
  
  

}
