import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, ViewController, Events } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { UsuarioService } from '../../services/domain/usuario.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { EnderecoService } from '../../services/domain/endereco.service';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';


@IonicPage()
@Component({
  selector: 'page-modal-perfil',
  templateUrl: 'modal-perfil.html',
})
export class ModalPerfilPage {


  @ViewChild('fileUpload') fileUpload: ElementRef;
  

  objectToUpdate = this.navParams.get('objectToUpdate');
  typeObjectToUpdate = this.navParams.get('typeObjectToUpdate'); 
  bucketBaseUrl = API_CONFIG.bucketBaseUrl;
  activeSegment = 'pessoais'
  editMode: boolean;    
  picture: any;
  showCameraIcon: any;
  img: string;
  constructor(public viewCtrl: ViewController, 
              public navParams: NavParams,
              public usuarioService:UsuarioService,
              private pacienteService:PacienteService,
              private profissionalSaude:ProfissionalSaudeService,
              private events:Events,
              private notificacoesService:NotificacoesService,
              private enderecoService:EnderecoService
      

              )
               {
  }

  ionViewDidLoad() {
    this.onChangePhoto()  
    this.events.subscribe('atualizar',()=>{      
     if(this.typeObjectToUpdate === 'paciente'){
      this.atualizarPaciente()
     }else if(this.typeObjectToUpdate === 'profissionalSaude'){
      this.atualizarProfissionalSaude()
     }
    })
    this.events.subscribe('atualizar:endereco',()=>{
      this.atualizarEnderecoPessoa()
     })    
  }
  onChangePhoto(){
    const element = this.fileUpload.nativeElement as HTMLInputElement;
      element.onchange = () => {      
        const reader = new FileReader();  
        reader.onload = (r: any) => {
        this.picture = r.target.result as string;
        this.sendPicture()           
        };  
        reader.readAsDataURL(element.files[0]);
      };
  }
  closeModal(){
    this.viewCtrl.dismiss()
    
  }
  setEditMode(){
    if(this.editMode){
      this.editMode = false      
      return
    } 
    this.editMode = true
  }
  atualizarPaciente(){        
    this.pacienteService.updatePaciente(this.objectToUpdate)
    .then(()=>{  
      this.notificacoesService.presentToast(`Sucesso ao atualizar o Paciente`  ,'',2500,'top')
      this.closeModal()            
    })
    .catch((error)=>{
      
    })
  }
  atualizarProfissionalSaude(){        
    this.profissionalSaude.update(this.objectToUpdate)
    .then(()=>{        
      this.notificacoesService.presentToast(`Sucesso ao atualizar o Profissional de saúde`  ,'',2500,'top')
      this.closeModal()            
    })
    .catch((error)=>{
      
    })
  }
  atualizarEnderecoPessoa(){    
    this.enderecoService.update(this.objectToUpdate.pessoa.endereco)    
    .then(()=>{  
      this.notificacoesService.presentToast(`Sucesso ao atualizar o ${this.returnTypeObjectToSave()}`,'',2500,'top')
      this.closeModal()            
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  returnTypeObjectToSave(){
    if(this.typeObjectToUpdate === 'paciente'){
      return 'Paciente'
    }else if(this.typeObjectToUpdate === 'profissionalSaude'){
      return 'Profissional de saúde'
    }
  }  
  
  sendPicture() {
    if(this.picture){
      this.usuarioService.uploadPicture(this.picture,this.objectToUpdate.pessoa.id)   
       .then(()=>{         
         this.notificacoesService.presentToast('Foto Alterada'  ,'',2500,'top')
       })
       .catch(()=>{
        this.notificacoesService
        .presentToast('Ocorreu Algum erro na tentiva de envio da foto, Desculpe, tente novamente','toast-error',3000,'middle');     
       });
    }
  }
  returnPhoto(){
    if(this.picture){
      return this.picture
    }else if(this.objectToUpdate.pessoa.urlFoto){      
       this.usuarioService.getImageFromBucket(this.objectToUpdate.pessoa.urlFoto)
       .subscribe(res =>{
        this.usuarioService.blobToDataURL(res).then(dataUrl => {
          let str: string = dataUrl as string;
           this.picture = this.usuarioService.sanitazer.bypassSecurityTrustUrl(str);
        });
       })
       
    }else{
      return 'assets/imgs/avatar-blank.png'
    }     
  }
  passMouseImage(show){
    this.showCameraIcon = show
 }
}
