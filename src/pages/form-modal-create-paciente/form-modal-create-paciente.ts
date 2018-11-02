import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, AlertController } from 'ionic-angular';
import { EnderecoService } from '../../services/domain/endereco.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { NaturalidadeService } from '../../services/domain/naturalidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoSanguineoService } from '../../services/domain/tipo.sanguineo.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';
import { CidadeService } from '../../services/domain/cidade.service';


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
  tiposSanguineo: any;
  linhasCuidado: any;
  pacienteLinhasCuidado = [];
  cidades: any;
  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              private formBuilder: FormBuilder,    
              private naturalidadeService:NaturalidadeService,
              private notificacoesService:NotificacoesService,
              private tipoSanguineoService:TipoSanguineoService,
              private linhaCuidadoService:LinhaCuidadoService,
              private cidadeService:CidadeService,
              private alertCtrl:AlertController

              )
               {  this.fillObject()
                  this.findAllNaturalidades()
                  this.iniciarFormGroup()
                  this.findAllTipoSanguineo();
                  this.findAllLinhaCuidado();  
                  this.findAllCidades();
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
              tipoSanguineo: [
                this.paciente.tipoSanguineo.id, Validators.required],  
                cidade: [
                  this.paciente.pessoa.endereco.cidade.id,Validators.required],                                                    
                    bairro: [
                      this.paciente.pessoa.endereco.bairro,
                       Validators.compose([Validators.required, Validators.minLength(5),
                        Validators.maxLength(50)])],
                    rua: [
                      this.paciente.pessoa.endereco.rua,
                        Validators.compose([Validators.required, Validators.minLength(5),
                        Validators.maxLength(50)])],                                                         
                    numero: [
                      this.paciente.pessoa.endereco.numero,
                        Validators.compose([Validators.required, Validators.minLength(1),
                        Validators.maxLength(5)])],       
                    cep: [
                      this.paciente.pessoa.endereco.cep,
                        Validators.compose([Validators.required, Validators.minLength(8),
                        Validators.maxLength(8)])],                                                         
            
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
    }else if(field === 'tipoSanguineo'){        
      this.paciente['tipoSanguineo']['id'] = value              
    }else{
      this.paciente['pessoa'][field] = value
    }    
  }

  onChangeEndereco(field,value){        
    if(field === 'cidade'){
      this.paciente.pessoa.endereco['cidade']['id'] = value  
    }else{
      this.paciente.pessoa.endereco[field] = value
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
findAllTipoSanguineo(){      
  this.tipoSanguineoService.findAll()
  .then(res=>{
    this.tiposSanguineo = res;
  })       
}
findAllLinhaCuidado(){
  this.linhaCuidadoService.findAll()
  .then(res => {
    this.linhasCuidado = res
  })
}
  findAllNaturalidades(){
    this.naturalidadeService.findAll()
    .then(res =>{
      this.naturalidades = res;      
    })    
  }
  findAllCidades(){
    this.cidadeService.findAll()
    .then(res =>{
      this.cidades = res;      
    })
  }

  alertEscolhaNovaLinhaCuidado() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Escolha uma linha de cuidado')            
    this.linhasCuidado.forEach(linhaCuidado => {
      this.pacienteLinhasCuidado.forEach(pacienteLinhaCuidado =>{
        if(linhaCuidado.id === pacienteLinhaCuidado.linhaCuidadoId ){
          linhaCuidado.pacienteJaPossuiLinhaCuidado = true
          return
        }
      })
      if(!linhaCuidado.pacienteJaPossuiLinhaCuidado){
        alert.addInput({
          type: 'checkbox',
          label: linhaCuidado.nome,
          handler: () => { 
            alert.dismiss()
            this.pacienteLinhasCuidado.push({linhaCuidadoId:linhaCuidado.id}) 
            
          }
        });
        alert.present()
      }
  });
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

  verificaErrosFomDadosMedicos():any{    
    if(this.pacienteLinhasCuidado.length === 0){
      this.notificacoesService.presentErrorValidationToastCustom('Um paciente deve ter pelo menos uma linha de cuidado')
      return;
    }
    if(this.formGroup['controls']['tipoSanguineo']['errors']){
      this.notificacoesService.presentErrorValidationToastCustom('Selecione um tipo sanguíneo')
      return;
    }    
    
    this.avancarPasso('endereco')
  }
  verificaErrosFomDadosEndereco():any{    
    let hasErrors = false;
    const inputs = {
      cidade:'',
      bairro:'',
      rua:'',
      numero:'',
      cep:''
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
    this.avancarPasso('contato')
  }
  avancarPasso(passo){
    this.activeSegment = passo
    console.log('see',this.paciente)
  } 

}
