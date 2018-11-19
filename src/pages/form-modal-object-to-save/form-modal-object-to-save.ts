import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { NaturalidadeService } from '../../services/domain/naturalidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoSanguineoService } from '../../services/domain/tipo.sanguineo.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { PacienteLinhaCuidadoService } from '../../services/domain/paciente.linha.cuidado.service';
import { PessoaService } from '../../services/domain/pessoa.service';
import { TelefoneService } from '../../services/domain/telefone.service';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';


@IonicPage()
@Component({
  selector: 'page-form-modal-object-to-save',
  templateUrl: 'form-modal-object-to-save.html',
})
export class FormModalObjectToSavePage {

  objectToSave;
  typeObjectToSave = this.navParams.get('typeObjectToSave');  
  activeSegment = 'pessoais'
  editMode: boolean;    
  naturalidades: any;
  formGroup : FormGroup;
  tiposSanguineo: any;
  linhasCuidado: any;
  pacienteLinhasCuidado = [];
  cidades: any;
  telefones = []
  picture: string;
  @ViewChild('fileUpload') fileUpload: ElementRef;
  showCameraIcon: boolean;
  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              private formBuilder: FormBuilder,    
              private naturalidadeService:NaturalidadeService,
              private notificacoesService:NotificacoesService,
              private pacienteService:PacienteService,
              private tipoSanguineoService:TipoSanguineoService,
              private linhaCuidadoService:LinhaCuidadoService,
              private pacienteLinhaCuidadoService:PacienteLinhaCuidadoService,
              private cidadeService:CidadeService,
              private alertCtrl:AlertController,
              private pessoaService:PessoaService,
              private telefoneService:TelefoneService,
              private profissionalSaudeService:ProfissionalSaudeService              

              )
               {  this.fillObject()
                  this.findAllNaturalidades()
                  this.iniciarFormGroup()
                  this.findAllTipoSanguineo();
                  this.findAllLinhaCuidado();  
                  this.findAllCidades();
  }
  ionViewDidLoad(){
    this.onChangePhoto()
  }

  onChangePhoto(){
    const element = this.fileUpload.nativeElement as HTMLInputElement;
      element.onchange = () => {      
        const reader = new FileReader();  
        reader.onload = (r: any) => {
        this.picture = r.target.result as string;        
        };  
        reader.readAsDataURL(element.files[0]);
      };
  }

  fillObject(){
    const naturalidade = {
      id:''
    }
    const cidade = {
      id:''
    }
    const endereco = {
      cidade:cidade
    }
    const pessoa = {
      endereco:endereco,
      naturalidade:naturalidade
    }
    const tipoSanguineo = {
      id:''
    }
    this.objectToSave = {
      pessoa:pessoa,
      tipoSanguineo:tipoSanguineo
    }
    if(this.typeObjectToSave!= 'paciente'){
      delete this.objectToSave.tipoSanguineo;
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
                this.typeObjectToSave === 'paciente' ? this.objectToSave.tipoSanguineo.id :'', this.typeObjectToSave === 'paciente' ? Validators.required :''],  
                cidade: [
                  this.objectToSave.pessoa.endereco.cidade.id,Validators.required],                                                    
                    bairro: [
                      this.objectToSave.pessoa.endereco.bairro,
                       Validators.compose([Validators.required, Validators.minLength(3),
                        Validators.maxLength(50)])],
                    rua: [
                      this.objectToSave.pessoa.endereco.rua,
                        Validators.compose([Validators.required, Validators.minLength(3),
                        Validators.maxLength(50)])],                                                         
                    numero: [
                      this.objectToSave.pessoa.endereco.numero,
                        Validators.compose([Validators.required, Validators.minLength(1),
                        Validators.maxLength(5)])],       
                    cep: [
                      this.objectToSave.pessoa.endereco.cep,
                        Validators.compose([Validators.required, Validators.minLength(8),
                        Validators.maxLength(8)])],    
                    email: [
                      this.objectToSave.pessoa.email,
                        Validators.compose([Validators.required, Validators.minLength(3),
                        Validators.maxLength(50),Validators.email])],                                                     
            
      });        
    }, 1);
}

  closeModal(){    
    if(this.viewCtrl && !this.viewCtrl.readReady.closed){
      this.viewCtrl.dismiss()          
    }
  }
  
  onChange(field,value){    
    if(field === 'dataNascimento'){           
    this.objectToSave['pessoa']['dataNascimento'] = this.returnDataValida(value)          
    }else if(field === 'naturalidade'){
      this.objectToSave['pessoa']['naturalidade']['id'] = value
    }else if(field === 'tipoSanguineo'){        
      this.objectToSave['tipoSanguineo']['id'] = value              
    }else{
      this.objectToSave['pessoa'][field] = value
    }        
  }

  onChangeEndereco(field,value){        
    if(field === 'cidade'){
      this.objectToSave.pessoa.endereco['cidade']['id'] = value  
    }else{
      this.objectToSave.pessoa.endereco[field] = value
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

  presentPromptAdicionarTelefone() {
    let alert = this.alertCtrl.create({
      title: 'Número de telefone',
      inputs: [
        {
          name: 'numero',
          placeholder: 'ex: 2127614324',
          type:'number'
        },       
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',          
        },
        {
          text: 'Adicionar',
          handler: data => {            
           this.telefones.push({numero:data.numero})
          }
        }
      ]
    });
    alert.present();
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
verificaExistePessoaComCpf(){
  return this.pessoaService.findPessoaByCpf(this.objectToSave.pessoa.cpf)
  .then(res => {
    if(res){
      return true
    }else{
      return false
    }
  }).catch(()=>{    
    return false
  })
}

verificaExistePessoaComEmail(){
  return this.pessoaService.findPessoaByEmail(this.objectToSave.pessoa.email)
  .then(res => {
    if(res){
      return true
    }else{
      return false
    }
  }).catch(()=>{    
    return false
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
      this.verificaExistePessoaComCpf().then(res=>{
        if(res){
          this.notificacoesService.presentErrorValidationToastCustom('Já existe alguém com esse CPF');
          hasErrors = true
        }
      if(hasErrors){
        return
      }      
      this.avancarPasso(this.typeObjectToSave === 'paciente' ? 'medicos' : 'endereco')       
    })  
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
  } 

  createObjectToSave(){        
    if(this.formGroup['controls']['email']['errors']){
      this.notificacoesService.presentErrorValidationToast('email')
      return
    }
    this.verificaExistePessoaComEmail().then(res=>{
      if(res){
        this.notificacoesService.presentErrorValidationToastCustom('Já existe alguém com esse email');
        return
      }
      if(this.typeObjectToSave === 'paciente'){
        this.createPaciente()
      }else if(this.typeObjectToSave === 'profissionalSaude'){
        this.createProfissionalSaude()
      }
      
    })
  }
  
  sendPicture(idPessoa) {
    if(this.picture){
      this.usuarioService.uploadPicture(this.picture,idPessoa)   
       .catch(()=>{
        this.notificacoesService
        .presentToast('Ocorreu Algum erro na tentiva de envio da foto, Desculpe, tente novamente','toast-error',3000,'middle');     
       });
    }
  }
  createPaciente(){
    this.pacienteService.insert(this.objectToSave)
      .then(paciente =>{      
        this.pacienteLinhasCuidado.forEach(element => {
          const pacienteLinhaCuidado = {
            linhaCuidadoId:element.linhaCuidadoId,
            pacienteId:paciente.id
          }
          this.sendPicture(paciente.pessoa.id)        
          this.pacienteLinhaCuidadoService.insertByPacienteIdAndLinhaCuidadoId(pacienteLinhaCuidado)
          });
          this.telefones.forEach(element => {
            const telefoneDto = {
              pessoaId:paciente.pessoa.id,
              numero:element.numero
            }
          this.telefoneService.insert(telefoneDto)
          
          });
          this.notificacoesService.presentToast('Paciente Criado',null,2500,'top')
          this.closeModal()
      }).catch(() =>{
        this.notificacoesService.presentAlertErro()
      })
  }
  createProfissionalSaude(){
    this.profissionalSaudeService.insert(this.objectToSave)
    .then(profissionalSaude =>{            
       
        this.telefones.forEach(element => {
          const telefoneDto = {
            pessoaId:profissionalSaude.pessoa.id,
            numero:element.numero
          }
        this.telefoneService.insert(telefoneDto)
        
        });
        this.sendPicture(profissionalSaude.pessoa.id)        
        this.notificacoesService.presentToast('Profissional de saúde Criado',null,2500,'top')
        this.closeModal()
    }).catch(() =>{
      this.notificacoesService.presentAlertErro()
    })
  }
  returnTypeObjectToSave(){
    if(this.typeObjectToSave === 'paciente'){
      return 'Paciente'
    }else if(this.typeObjectToSave === 'profissionalSaude'){
      return 'Profissional de saúde'
    }
  }  
  passMouseImage(show){
    this.showCameraIcon = show
 }
 removePhoto(){
   this.picture = null;
  }
}
