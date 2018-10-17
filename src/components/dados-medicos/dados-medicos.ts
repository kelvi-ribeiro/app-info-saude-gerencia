import { Component, Input } from '@angular/core';

/**
 * Generated class for the DadosMedicosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dados-medicos',
  templateUrl: 'dados-medicos.html'
})
export class DadosMedicosComponent {

  @Input() paciente;

  constructor() {
    
  }
}
