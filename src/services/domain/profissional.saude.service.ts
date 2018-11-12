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
        `${API_CONFIG.baseUrl}/profissionais-saude/page?nome=${nome ? nome: ''}&page=${page ? page : ''}`,
        null,
        headers
      );
    });
  }

  updatePaciente(paciente) {
    delete paciente.pessoa.perfis
    console.log(paciente)
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/pacientes/${paciente.id}`,
        paciente,
        headers
      );
    });
  }

  insert(paciente) {    
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/pacientes`,
        paciente,
        headers
      );
    });
  }
  
}