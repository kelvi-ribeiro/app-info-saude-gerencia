import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { EnderecoService } from '../../services/domain/endereco.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { NaturalidadeService } from '../../services/domain/naturalidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/**
 * Generated class for the FormModalCreatePacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-modal-create-paciente',
  templateUrl: 'form-modal-create-paciente.html',
})
export class FormModalCreatePacientePage {

  paciente;  
  activeSegment = 'pessoais'
  editMode: boolean;    
  naturalidades: any;
  formGroup : FormGroup;
  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              private formBuilder: FormBuilder,    
              private naturalidadeService:NaturalidadeService,
              private notificacoesService:NotificacoesService

              )
               {  this.fillObject()
                  this.findAllNaturalidades()
                 this.iniciarFormGroup()
  }

  fillObject(){
    const naturalidade = Object
    const cidade = Object
    const endereco = {
      cidade:cidade
    }
    const pessoa = {
      endereco:endereco,
      naturalidade:naturalidade
    }
    const tipoSanguineo = Object
    this.paciente = {
      pessoa:pessoa,
      tipoSanguineo:tipoSanguineo
    }
  }

  iniciarFormGroup(): any {
    setTimeout(() => {
      this.formGroup = this.formBuilder.group({
        nome: [
          '',
           Validators.compose([Validators.required, Validators.minLength(3),
            Validators.maxLength(50)])],                                            
        dataNascimento: [
          '',
          Validators.required,],                                            
        cpf: [
          '',
          Validators.compose([Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)])],  
          naturalidade:[
            '',
            Validators.required,],                                          
            sexo:[
              '',
              Validators.required,],  
      });        
    }, 1);
}

  closeModal(){
    this.viewCtrl.dismiss()    
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
 
  verificaErrosFomrDadosPesoais():any{
    let hasErrors = false;
    const inputs = {
      nome:'',
      dataNascimento:'',
      cpf:'',
      naturalidade:'',
      sexo:''
    }
    Object.keys(inputs).forEach(element =>{
      if(this.formGroup['controls'][element]['errors']){
        this.notificacoesService.presentErrorValidationToast(element);        
        hasErrors = true
      }
    })
    if(hasErrors){
      return
    }
    this.avancarPasso('medicos')
  }
  avancarPasso(passo){
    this.activeSegment = passo
  } 

}
