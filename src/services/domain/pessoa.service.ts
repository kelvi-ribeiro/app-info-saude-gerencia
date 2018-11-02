import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers} from '@angular/http';
import { HttpClient } from '../../../node_modules/@angular/common/http';



@Injectable()
export class PessoaService {  
  

  constructor(
    public http: HttpClient,
    public storage: StorageService,      
    public handlerResponseService:HandlerResponseProvider

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