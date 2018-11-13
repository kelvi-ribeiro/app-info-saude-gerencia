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

  @Input() objectToUpdate;
}
