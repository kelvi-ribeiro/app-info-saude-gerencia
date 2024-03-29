import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';
import { CidadeService } from '../../services/domain/cidade.service';
import { ViaCepService } from '../../services/domain/viaCep.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacoesService } from '../../services/domain/notificacoes.service';


@Component({
  selector: 'form-dados-endereco',
  templateUrl: 'form-dados-endereco.html'
})
export class FormDadosEnderecoComponent {
  cidades: any;
  @Input()objectToUpdate
  formGroup : FormGroup;

  constructor(
            private events:Events,
            private cidadeService:CidadeService,
            private formBuilder: FormBuilder,             
            private viaCepService:ViaCepService,
            private notificacoesService:NotificacoesService
            
            )    {
          setTimeout(() => {
            this.findAllCidades()    
            this.iniciarFormGroup()            
          }, 1);
  }

  iniciarFormGroup(): any {
    setTimeout(() => {
      this.formGroup = this.formBuilder.group({
        cidade: [
          this.objectToUpdate.pessoa.endereco.cidade.id,Validators.required],                                                    
            bairro: [
              this.objectToUpdate.pessoa.endereco.bairro,
               Validators.compose([Validators.required, Validators.minLength(3),
                Validators.maxLength(50)])],
            rua: [
              this.objectToUpdate.pessoa.endereco.rua,
                Validators.compose([Validators.required, Validators.minLength(3),
                Validators.maxLength(50)])],                                                         
            numero: [
              this.objectToUpdate.pessoa.endereco.numero,
                Validators.compose([Validators.required, Validators.minLength(1),
                Validators.maxLength(5)])],       
            cep: [
              this.objectToUpdate.pessoa.endereco.cep,
                Validators.compose([Validators.required, Validators.minLength(8),
                Validators.maxLength(8)])],       
      });        
    }, 1);
}

  onChange(field,value){        
    if(field === 'cidade'){
      this.objectToUpdate.pessoa.endereco['cidade']['id'] = value  
    }else{
      this.objectToUpdate.pessoa.endereco[field] = value
    }    
    this.events.publish('editar-dados-endereco',field,value)       
  }

  findAllCidades(){
    this.cidadeService.findAll()
    .then(res =>{
      this.cidades = res;      
    })
  }

  atualizar(){        
    if(this.verificaErrosForm()){
      return
    }        
    this.events.publish('atualizar:endereco',this.objectToUpdate)
  }
  verificaErrosForm():any{
    let hasErrors = false;
    Object.keys(this.formGroup.controls).find(element => {
      if(this.formGroup['controls'][element]['errors']){        
        this.notificacoesService.presentErrorValidationToast(element);        
        return hasErrors = true
      }
    });
    return hasErrors;
    
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
