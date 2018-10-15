import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_CONFIG } from "../../config/api.config";



@Injectable()
export class ViaCepService {

  constructor(
    public http: HttpClient
    ) {
  }

  findEnderecoByCep(cep) {
    return this.http.get(`${API_CONFIG.viaCepUrl}/${cep}/json`);
  }
  
}




