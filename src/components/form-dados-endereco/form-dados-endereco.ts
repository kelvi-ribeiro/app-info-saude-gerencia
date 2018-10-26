import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { CidadeService } from '../../services/domain/cidade.service';


@Component({
  selector: 'form-dados-endereco',
  templateUrl: 'form-dados-endereco.html'
})
export class FormDadosEnderecoComponent {
  cidades: any;
  @Input()paciente
  

  constructor(
            private events:Events,
            private cidadeService:CidadeService
            )    {

              this.findAllCidades()
    
  }

  onChange(field,value){        
    this.events.publish('editar-dados-endereco:paciente',field,value)       
  }

  findAllCidades(){
    this.cidadeService.findAll()
    .then(res =>{
      this.cidades = res;      
    })
  }

  atualizarPaciente(){        
   this.events.publish('atualizar:paciente')
  }

}
