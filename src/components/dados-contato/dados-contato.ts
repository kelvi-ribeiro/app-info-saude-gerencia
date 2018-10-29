import { Component, Input } from '@angular/core';
import { TelefoneService } from '../../services/domain/telefone.service';

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
  telefones: any;

  constructor(private telefoneService:TelefoneService) {
    setTimeout(() => {
      this.findAllByPessoaId()      
    }, 50);
  }
  findAllByPessoaId(){
    this.telefoneService.findAllByPessoaId(this.paciente.pessoa.id)
    .then(res=>{
      this.telefones = res
    })
  }

}
