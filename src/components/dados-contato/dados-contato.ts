import { Component, Input } from '@angular/core';

/**
 * Generated class for the DadosContatoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dados-contato',
  templateUrl: 'dados-contato.html'
})
export class DadosContatoComponent {

  @Input() paciente;

  constructor() {
    
  }

}
