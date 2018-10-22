import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the FormDadosPessoaisComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-dados-pessoais',
  templateUrl: 'form-dados-pessoais.html'
})
export class FormDadosPessoaisComponent {

  @Input()paciente
  
  constructor(private events:Events) { 
  }
  
  onChange(field,value){    
    if(field === 'dataNascimento'){           
      if (Object.prototype.toString.call(new Date(value)) === "[object Date]") {        
        if (isNaN(new Date(value).getTime())) {  // d.valueOf() could also work
          return
        } else {                
            value = new Date(value).setDate(new Date(value).getDate() +1)             
            this.events.publish('editar-dados-pessoa:paciente',field,value)            
        }
      } else {
        return
      }      
    }else{
      this.events.publish('editar-dados-pessoa:paciente',field,value)            

    }    
  }
  convertTimeStampToDate(timestamp){
    const dataTratada = new Date(timestamp)
    return `${dataTratada.getFullYear()}-${dataTratada.getMonth() + 1 >= 10 ? '':0}${dataTratada.getMonth() + 1}-${dataTratada.getDate() >= 10 ? '':0}${dataTratada.getDate()}`
  }
}
