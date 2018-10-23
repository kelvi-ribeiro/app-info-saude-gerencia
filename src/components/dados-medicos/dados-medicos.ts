import { Component, Input } from '@angular/core';
import { PacienteLinhaCuidadoService } from '../../services/domain/paciente.linha.cuidado.service';

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
  pacienteLinhasCuidado = []

  constructor(private pacienteLinhaCuidadoService:PacienteLinhaCuidadoService) {
    setTimeout(() => {      
      this.pacienteLinhaCuidadoService.findAllByPacienteId(this.paciente.id)
      .then(res=>{
        this.pacienteLinhasCuidado = res;
      })
      
    }, 50);
    
  }
}
