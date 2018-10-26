import { Injectable } from "@angular/core";

import { API_CONFIG } from "../../config/api.config";
import { HandlerResponseProvider } from "../handler-response/handler-response";



@Injectable()
export class ViaCepService {

  constructor(
    public handlerResponseService: HandlerResponseProvider
    ) {
  }

  findEnderecoByCep(cep) {
    return this.handlerResponseService.handlerResponse(
      "get",
      `${API_CONFIG.viaCepUrl}/${cep}/json`,
      null,
      null
    );  
  }
  
}




