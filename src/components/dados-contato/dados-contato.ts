import { Component, Input } from '@angular/core';
import { TelefoneService } from '../../services/domain/telefone.service';

@Component({
  selector: 'dados-contato',
  templateUrl: 'dados-contato.html'
})
export class DadosContatoComponent {

  @Input() objectToUpdate;
  telefones: any;

  constructor(private telefoneService:TelefoneService) {
    setTimeout(() => {
      this.findAllByPessoaId()      
    }, 50);
  }
  findAllByPessoaId(){
    this.telefoneService.findAllByPessoaId(this.objectToUpdate.pessoa.id)
    .then(res=>{
      this.telefones = res
    })
  }

}
