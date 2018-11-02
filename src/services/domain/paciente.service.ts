import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';



@Injectable()
export class PacienteService {
  perfis;
  email;

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService,
    public storageService: StorageService,
    public handlerResponseService:HandlerResponseProvider

    ) {
  }

  findPessoaByAnyField(linhaCuidadoId?:number,campoPesquisa?:string,page?:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/pacientes/page?linhaCuidadoId=${linhaCuidadoId ? linhaCuidadoId : ''}&campoPesquisa=${campoPesquisa ? campoPesquisa: ''}&page=${page ? page : ''}`,
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


  showOnlinePacientes() {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/pacientes/number-online-users`,
        null,
        headers
      );
    });
  }
}