import { Component, Input } from '@angular/core';

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

  constructor() {
    console.log(this.paciente)
  }

}
