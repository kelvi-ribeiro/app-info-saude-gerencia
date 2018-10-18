import { HandlerResponseProvider } from './../handler-response/handler-response';
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";
import { Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';



@Injectable()
export class UsuarioService {
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

//   findPacienteByPessoaEmail(email: string) {
//     let headers = new Headers();
//     headers.append("Authorization", `Bearer ${this.storage.getUserCredentials().token}`);
//     return this.handlerResponseService.handlerResponse(
//       "get",
//       `${API_CONFIG.baseUrl}/pacientes/pessoaEmail=${email}`,
//       null,
//       headers
//     );
// }

findProfissionalSaudeByPessoaCpf() {
  let headers = new Headers();
  return this.storage.getUserCredentials()
  .then(userCredentials=>{
    if(!userCredentials){
      return;
    }
    headers.append('Authorization', `Bearer ${userCredentials['token']}`)
    return this.handlerResponseService.handlerResponse(
      "get",
      `${API_CONFIG.baseUrl}/profissionais-saude/pessoaCpf?cpf=${userCredentials.cpf}`,
      null,
      headers
    );
  })
}

  findPacienteByPessoaCpf() {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/pacientes/pessoaCpf?cpf=${userCredentials.cpf}`,
        null,
        headers
      );
    })
  }
 

  getImageFromBucket(urlFoto = this.storageService.getUser().pessoa.urlFoto ) {
      let headers = new HttpHeaders();
      headers = headers
      .set("Cache-Control", "no-cache, no-store, must-revalidate")
      .set("Pragma", "no-cache")
      .set("Expires", "0");
      let url = `${API_CONFIG.bucketBaseUrl}/${urlFoto}`
      return this.http.get(url, {headers:headers,responseType:'blob'});
  }

  getImageFromBucketFromUsers(urlFoto) {
    let url = `${API_CONFIG.bucketBaseUrl}/${urlFoto}`
    return this.http.get(url, { responseType: 'blob' });
  }

  uploadPicture(picture) {
    return this.storage.getUserCredentials()
    .then(userCredentials =>{
      if(!userCredentials){
        return;
      }
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${userCredentials['token']}`)
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData: FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.handlerResponseService.handlerResponseFoto(
      "post",
      `${API_CONFIG.baseUrl}/pessoas/picture`,
      formData,
      headers
    );
    });
  }
  alterarSenha(objNovaSenha) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "put",
        `${API_CONFIG.baseUrl}/pessoas/alterarSenha`,
        objNovaSenha,
        headers
      );
    });


  }

  esqueceuSenha(objNovaSenha) {
      return this.handlerResponseService.handlerResponse(
        "post",
        `${API_CONFIG.baseUrl}/esqueceuSenha`,
        objNovaSenha,
        null
      );
  }

  checkUserIsOnline(dataUltimoAcesso){
    if(!dataUltimoAcesso)return false
    const currentTime = new Date()
    currentTime.setSeconds(currentTime.getSeconds() - 80)
    dataUltimoAcesso = new Date(dataUltimoAcesso)    
    return dataUltimoAcesso.getTime() > currentTime.getTime() ? true : false
  }


  // getImageFromBucket(): Observable<any> {
  //   let url = `${API_CONFIG.bucketBaseUrl}/${this.storageService.getUserUrlFoto()}`
  //   return this.http.get(url, { responseType: 'blob' });
  // }
  // getImageFromBucketFromUsers(urlFoto): Observable<any> {
  //   let url = `${API_CONFIG.bucketBaseUrl}/${urlFoto}`
  //   return this.http.get(url, { responseType: 'blob' });
  // }

  // insert(obj: UsuarioDTO) {
  //   return this.http.post(
  //     `${API_CONFIG.baseUrl}/usuarios`,
  //     obj,
  //     {
  //       observe: 'response',
  //       responseType: 'text'
  //     }
  //   );
  // }

  // uploadPicture(picture) {
  //   let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
  //   let formData: FormData = new FormData();
  //   formData.set('file', pictureBlob, 'file.png');
  //   return this.http.post(
  //     `${API_CONFIG.baseUrl}/usuarios/picture`,
  //     formData,
  //     {
  //       observe: 'response',
  //       responseType: 'text'
  //     }
  //   );
  // }

    }




