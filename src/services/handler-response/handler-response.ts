import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './../storage.service';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout'
import { Observable } from 'rxjs/Observable';
import { TimeoutError } from 'rxjs/util/TimeoutError'

import { LocalUser } from '../../models/local_user';

@Injectable()
export class HandlerResponseProvider {

  constructor(
    public http: Http,
    public storage: StorageService,
    private events: Events) {
  }
  handlerResponse(method, url, payload?, headers?):Promise<any> {
    let response;
    if (method === 'get' || method === 'delete') {
      response = this.http[method](url, {headers:headers})
    } else {
      response = this.http[method](url, payload, { headers: headers })
    }
    return response
      .map(res => {
        if(res && res._body === "")
          return new Observable();
        else
          return this.handlerSuccess(null, res.json());
      })
      .timeout(20000)
      .toPromise()
      .catch(err => {throw this.handlerError(err, method, url, payload, headers)})
  }
  handlerResponseFoto(method, url, payload?, headers?):Promise<any> {
    let response;
    if (method === 'get' || method === 'delete') {
      response = this.http[method](url, {headers:headers})
    } else {
      response = this.http[method](url, payload, { headers: headers })
    }
    return response
      .map(res => {
        if(res && res._body === "")
          return new Observable();
        else
          return this.handlerSuccess(null, res.json());
      })
      .timeout(110000)
      .toPromise()
      .catch(err => {throw this.handlerError(err, method, url, payload, headers)})
  }

  handlerSuccess(response, res) {
    return res;
  }
  handlerError(err, method, url, payload?, headers?) {

    if (err.json) {
      const erro = err.json();

      if (erro.error === 'invalid_token') {
        const newHeaders: Headers = new Headers();
        const reqHeaders: Headers = new Headers();
        let newToken;
        this.storage.getUserCredentials()
        .then(token=>{
          if(!token){
            return;
          }
          newHeaders.append('Authorization',`Bearer ${token}`)

        })

          return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, null, { headers: newHeaders })
            .map(token => newToken = token.json())
            .toPromise()
            .then(() => {
              let user:LocalUser = {
                token:newToken,
                cpf:this.storage.getUser().pessoa.cpf
              }
              return this.storage.setUserCredentials(user)
                .then(tk => {

                  let response;
                  this.events.publish("token:update", tk);
                  reqHeaders.append('Authorization', `Bearer ${newToken.access_token}`)
                  if (method === 'get') {
                    response = this.http[method](url, { headers: reqHeaders })
                  } else {
                    response = this.http[method](url, payload, { headers: reqHeaders })
                  }
                  return response
                    .map(res => res.json())
                    .catch(err => err)
                    .toPromise()
                }, err => err)
            }, err => err)

      } else if (erro.status === 401){
        return erro;
      }
    } else {
      if(err instanceof TimeoutError){
        return 'Tempo de resposta excedido, tente novamente.';
      }
      return err
    }
  }

}
