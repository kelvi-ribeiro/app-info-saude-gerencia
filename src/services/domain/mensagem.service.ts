import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers} from '@angular/http';



@Injectable()
export class MensagemService {
  constructor(    
    public storage: StorageService,
    public handlerResponseService:HandlerResponseProvider

    ) {
  }  

  findAllPageable(page?:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/mensagens/page?page=${page}`,
        null,
        headers
      );
    });
  }

  findMensagemByAnyField(linhaCuidadoId?:number,campoPesquisa?:string,page?:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/mensagens/page/any-field?linhaCuidadoId=${linhaCuidadoId ? linhaCuidadoId : ''}&campoPesquisa=${campoPesquisa ? campoPesquisa: ''}&page=${page ? page : ''}`,
        null,
        headers
      );
    });
  }
 

  insert(mensagemDTO) {    
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/mensagens`,
        mensagemDTO,
        headers
      );
    });
  }


  
}