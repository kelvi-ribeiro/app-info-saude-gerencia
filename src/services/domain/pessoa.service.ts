import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers} from '@angular/http';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ImageUtilService } from '../image-util.service';



@Injectable()
export class PessoaService {  
  

  constructor(
    public http: HttpClient,
    public storage: StorageService,      
    public handlerResponseService:HandlerResponseProvider,
    public imageUtilService: ImageUtilService,

    ) {
  }

  findPessoaByEmail(email) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/pessoas/email?value=${email}`,
        null,
        headers
      );
    });
  }

  setUserOnline(pessoaId){    
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/pessoas/setUserOnline?pessoaId=${pessoaId}`,
        null,
        headers
      );
    })  
  }

  deletePerfil(pessoaId,idPerfil){    
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "delete",
        `${API_CONFIG.baseUrl}/pessoas/delete-perfil/${pessoaId}/${idPerfil}`,
        null,
        headers
      );
    })
  
  }

  addPerfil(pessoaId,idPerfil){    
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/pessoas/add-perfil/${pessoaId}/${idPerfil}`,
        null,
        headers
      );
    })
  
  }


  uploadPicture(picture,idPessoa) {
    return this.storage.getUserCredentials()
    .then(userCredentials =>{
      if(!userCredentials){
        return;
      }
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userCredentials['token']}`)
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.handlerResponseService.handlerResponseFoto(
      "post",
      `${API_CONFIG.baseUrl}/pessoas/picture?idPessoa=${idPessoa}`,
      formData,
      headers
    );
    });
  }

  findPessoaByCpf(cpf) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/pessoas/cpf?value=${cpf}`,
        null,
        headers
      );
    });
  }  
}