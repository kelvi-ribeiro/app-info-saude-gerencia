import { Component, Input } from '@angular/core';
import { PacienteLinhaCuidadoService } from '../../services/domain/paciente.linha.cuidado.service';


@Component({
  selector: 'dados-medicos',
  templateUrl: 'dados-medicos.html'
})
export class DadosMedicosComponent {

  @Input() objectToUpdate;
  pacienteLinhasCuidado = []

  constructor(private pacienteLinhaCuidadoService:PacienteLinhaCuidadoService) {
    setTimeout(() => {              
      this.findAllPacienteLinhaCuidado();      
        
    }, 50);    
  }
  
  findAllPacienteLinhaCuidado(){
    
    this.pacienteLinhaCuidadoService.findAllByPacienteId(this.objectToUpdate.id)
    .then(res=>{
      this.pacienteLinhasCuidado = res;
    }) 

  }
}
