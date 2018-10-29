import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { Headers } from '@angular/http';

@Injectable()
export class TelefoneService {
  constructor(    
    public storage: StorageService,
    public handlerResponseService: HandlerResponseProvider

  ) {
  }

  findAllByPessoaId(pessoaId:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
      .then(userCredentials => {
        if (!userCredentials) {
          return;
        }
        headers.append('Authorization', `Bearer ${userCredentials['token']}`)
        return this.handlerResponseService.handlerResponse(
          "get",
          `${API_CONFIG.baseUrl}/telefones/pessoa-id/${pessoaId}`,
          null,
          headers
        );
      })
  }
  insertByPessoaId(numero,pessoaId){
    const telefone = {
      numero:numero,
      pessoaId:pessoaId
    }
    let headers = new Headers();
    return this.storage.getUserCredentials()
      .then(userCredentials => {
        if (!userCredentials) {
          return;
        }
        headers.append('Authorization', `Bearer ${userCredentials['token']}`)
        return this.handlerResponseService.handlerResponse(
          "post",
          `${API_CONFIG.baseUrl}/telefones`,
          telefone,
          headers
        );
      })
  }   
  update(telefone,pessoaId) {  
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/telefones/${pessoaId}`,
        telefone,
        headers
      );
    });
  }

  delete(telefoneId){
    let headers = new Headers();
    return this.storage.getUserCredentials()
      .then(userCredentials => {
        if (!userCredentials) {
          return;
        }
        headers.append('Authorization', `Bearer ${userCredentials['token']}`)
        return this.handlerResponseService.handlerResponse(
          "delete",
          `${API_CONFIG.baseUrl}/telefones/${telefoneId}`,
          null,
          headers
        );
      })
  }   
}