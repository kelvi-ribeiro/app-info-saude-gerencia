import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers} from '@angular/http';

@Injectable()
export class ProfissionalSaudeService {  
  

  constructor(    
    public storage: StorageService,    
    public handlerResponseService:HandlerResponseProvider,
    ) {
  }

  findByName(nome:string,page:any) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/profissionais-saude/page?nomePessoa=${nome ? nome: ''}&page=${page ? page : ''}`,
        null,
        headers
      );
    });
  }

  update(object) {
    delete object.pessoa.perfis    
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/profissionais-saude/${object.id}`,
        object,
        headers
      );
    });
  }

  insert(object) {    
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/profissionais-saude`,
        object,
        headers
      );
    });
  }
  
}