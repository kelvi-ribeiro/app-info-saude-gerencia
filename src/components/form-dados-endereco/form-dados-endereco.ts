import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { CidadeService } from '../../services/domain/cidade.service';
import { EnderecoService } from '../../services/domain/endereco.service';
import { ViaCepService } from '../../services/domain/viaCep.service';


@Component({
  selector: 'form-dados-endereco',
  templateUrl: 'form-dados-endereco.html'
})
export class FormDadosEnderecoComponent {
  cidades: any;
  @Input()paciente
  

  constructor(
            private events:Events,
            private cidadeService:CidadeService,
            private viaCepService:ViaCepService
            
            )    {

              this.findAllCidades()
    
  }

  onChange(field,value){        
    if(field === 'cidade'){
      this.paciente.pessoa.endereco['cidade']['id'] = value  
    }else{
      this.paciente.pessoa.endereco[field] = value
    }
    console.log(this.paciente.pessoa.endereco)
    this.events.publish('editar-dados-endereco:paciente',field,value)       
  }

  findAllCidades(){
    this.cidadeService.findAll()
    .then(res =>{
      this.cidades = res;      
    })
  }

  atualizarPaciente(){        
    this.events.publish('atualizar:endereco')
  }

  findEnderecoByCep(value){
   /*  if(value.length > 7){
      this.viaCepService.findEnderecoByCep(value)
      .then(enderecoEncontrado =>{
        const endereco = this.paciente.pessoa.endereco        
        endereco.bairro = enderecoEncontrado.bairro
        endereco.rua = enderecoEncontrado.logradouro        
        const cidadeEncontrada = this.cidades
        .find(el => el.nome.includes(enderecoEncontrado.localidade))
        this.cidades = []
        this.cidades.push(cidadeEncontrada)
        endereco.id = cidadeEncontrada.id         
        this.paciente.pessoa.endereco = endereco        
      })
    } */
  
  
}

}
