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

  //{{host}}/pacientes/page?linhaCuidadoId=2&pessoaNome=Ada
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService,
    public storageService: StorageService,
    public handlerResponseService:HandlerResponseProvider

    ) {
  }

  findPessoaByAnyField(campoPesquisa?:string,linhaCuidadoId?:number,page?:number) {
    let headers = new Headers();
    return this.storage.getUserCredentials()
    .then(userCredentials=>{
      if(!userCredentials){
        return;
      }
      headers.append('Authorization', `Bearer ${userCredentials['token']}`)
      return this.handlerResponseService.handlerResponse(
        "get",
        `${API_CONFIG.baseUrl}/pacientes/page?campoPesquisa=${campoPesquisa ? campoPesquisa : ''}&linhaCuidadoId=${linhaCuidadoId ? linhaCuidadoId:''}&page=${page ? page : ''}`,
        null,
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




