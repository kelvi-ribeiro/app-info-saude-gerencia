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
        `${API_CONFIG.baseUrl}/pacientes/page?page=${page}`,
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