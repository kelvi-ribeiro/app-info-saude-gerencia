import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers } from '@angular/http';
import { elementAttribute } from '@angular/core/src/render3/instructions';




@Injectable()
export class PacienteLinhaCuidadoService {
  constructor(    
    public storage: StorageService,
    public handlerResponseService: HandlerResponseProvider

  ) {
  }

  findAllByPacienteId(pacienteId:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
      .then(userCredentials => {
        if (!userCredentials) {
          return;
        }
        headers.append('Authorization', `Bearer ${userCredentials['token']}`)
        return this.handlerResponseService.handlerResponse(
          "get",
          `${API_CONFIG.baseUrl}/pacientes-linhas-cuidado/paciente-id/${pacienteId}`,
          null,
          headers
        );
      })
  }
  insertByPacienteIdAndLinhaCuidadoId(pacienteLinhaCuidado){
    let headers = new Headers();
    return this.storage.getUserCredentials()
      .then(userCredentials => {
        if (!userCredentials) {
          return;
        }
        headers.append('Authorization', `Bearer ${userCredentials['token']}`)
        return this.handlerResponseService.handlerResponse(
          "post",
          `${API_CONFIG.baseUrl}/pacientes-linhas-cuidado`,
          pacienteLinhaCuidado,
          headers
        );
      })
  }   
  update(pacienteLinhasCuidado,pacienteId) {
    const pacienteLinhaCuidadoDTO = {
      linhaCuidadoId:pacienteLinhasCuidado.linhaCuidado.id,
      pacienteId:pacienteId
    }
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/pacientes-linhas-cuidado/${pacienteLinhasCuidado.id}`,
        pacienteLinhaCuidadoDTO,
        headers
      );
    });
  }

  delete(pacienteLinhaCuidadoId){
    let headers = new Headers();
    return this.storage.getUserCredentials()
      .then(userCredentials => {
        if (!userCredentials) {
          return;
        }
        headers.append('Authorization', `Bearer ${userCredentials['token']}`)
        return this.handlerResponseService.handlerResponse(
          "delete",
          `${API_CONFIG.baseUrl}/pacientes-linhas-cuidado/${pacienteLinhaCuidadoId}`,
          null,
          headers
        );
      })
  }   
}




