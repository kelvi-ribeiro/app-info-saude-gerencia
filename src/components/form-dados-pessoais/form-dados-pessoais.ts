import { Component, Input } from '@angular/core';
import { Events} from 'ionic-angular';
import { NaturalidadeService } from '../../services/domain/naturalidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificacoesService } from '../../services/domain/notificacoes.service';



@Component({
  selector: 'form-dados-pessoais',
  templateUrl: 'form-dados-pessoais.html'
})
export class FormDadosPessoaisComponent {
  

  @Input('paciente')paciente
  naturalidades = [];
  formGroup : FormGroup;
  
  constructor(private events:Events,
              private naturalidadeService:NaturalidadeService,
              private formBuilder: FormBuilder,              
              private notificacoesService:NotificacoesService
              ) {
                this.iniciarFormGroup()
                this.findAllNaturalidades()               
  }  
  iniciarFormGroup(): any {
      setTimeout(() => {
        this.formGroup = this.formBuilder.group({
          nome: [
            this.paciente.pessoa.nome,
             Validators.compose([Validators.required, Validators.minLength(3),
              Validators.maxLength(50)])],                                            
          dataNascimento: [
            this.convertTimeStampToDate(this.paciente.pessoa.dataNascimento),
            Validators.required,],                                            
          cpf: [this.paciente.pessoa.cpf,
            Validators.compose([Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11)])],  
            naturalidade:[
              this.paciente.pessoa.naturalidade.id,
              Validators.required,],                                          
              sexo:[
                this.paciente.pessoa.sexo,
                Validators.required,],  
        });        
      }, 1);
  }
  
  onChange(field,value){
    if(field === 'dataNascimento'){           
    this.paciente['pessoa']['dataNascimento'] = this.returnDataValida(value)
          
    }else if(field === 'naturalidade'){
      this.paciente['pessoa']['naturalidade']['id'] = value
    }else{
      this.paciente['pessoa'][field] = value

    }    
  }
  convertTimeStampToDate(timestamp){
    const dataTratada = new Date(timestamp)
    return `${dataTratada.getFullYear()}-${dataTratada.getMonth() + 1 >= 10 ? '':0}${dataTratada.getMonth() + 1}-${dataTratada.getDate() >= 10 ? '':0}${dataTratada.getDate()}`
  }
  returnDataValida(value){
    if (Object.prototype.toString.call(new Date(value)) === "[object Date]") {        
      if (isNaN(new Date(value).getTime())) {  // d.valueOf() could also work
        return value
      } else {                
          value = new Date(value).setDate(new Date(value).getDate() +1)             
          return  value
      }
    } else {
      return value
  }
}
  findAllNaturalidades(){
    this.naturalidadeService.findAll()
    .then(res =>{
      this.naturalidades = res;      
    })
    
  }
  atualizarPaciente(){       
    if(this.verificaErrosForm()){
      return
    }
    
    this.events.publish('atualizar:paciente',this.paciente)
  }
  verificaErrosForm():any{
    let hasErrors = false;
    Object.keys(this.formGroup.controls).forEach(element => {
      if(this.formGroup['controls'][element]['errors']){        
        this.notificacoesService.presentErrorValidationToast(element);
        console.log('Bate aqui')
        hasErrors = true
      }
    });
    return hasErrors;
    
  }
}
