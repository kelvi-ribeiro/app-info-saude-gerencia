import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers } from '@angular/http';
import { elementAttribute } from '@angular/core/src/render3/instructions';




@Injectable()
export class InteracaoService {
  constructor(    
    public storage: StorageService,
    public handlerResponseService: HandlerResponseProvider

  ) {
  }

  showNumberMessageRed(idMensagem:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/interacoes/show-number-message-red?idMensagem=${idMensagem}`,
        null,
        headers
      );
    });
  }
  
}




