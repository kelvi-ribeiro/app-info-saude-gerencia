import { Component, Input } from '@angular/core';

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

  constructor() {
    
    
  }

}
