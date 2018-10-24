import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Generated class for the DadosEnderecoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dados-endereco',
  templateUrl: 'dados-endereco.html'
})
export class DadosEnderecoComponent {

  @Input() paciente;

  constructor(private events:Events) {
    setTimeout(() => {              
        this.events.publish('editar-dados-pessoa-endereco:paciente','bairro','Areia Branca')      
        this.events.publish('editar-dados-pessoa:paciente','rua','Souza Herdy')              
        this.events.publish('editar-dados-pessoa:paciente','numero','1000')      
        this.events.publish('editar-dados-pessoa:paciente','cep','23120180')      
        
        
        
    }, 1000);
  }
  


}
