import { Component, Input } from '@angular/core';
import { TipoSanguineoService } from '../../services/domain/tipo.sanguineo.service';
import { Events } from 'ionic-angular';

/**
 * Generated class for the FormDadosMedicosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-dados-medicos',
  templateUrl: 'form-dados-medicos.html'
})
export class FormDadosMedicosComponent {

  @Input() paciente;
  tiposSanguineo: any;

  constructor(
    private tipoSanguineoService:TipoSanguineoService,
    private events:Events) {  
    this.findAllTiposSanguineo()
  }

  onChange(field,value){              
      this.events.publish('editar-dados-medicos:paciente',field,value)            
  }
  findAllTiposSanguineo(){
    this.tipoSanguineoService.findAll()
    .then(res =>{
      this.tiposSanguineo = res;      
    })
  }
}
