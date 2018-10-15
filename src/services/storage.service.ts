import { Platform } from 'ionic-angular';
import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable()
export class StorageService {

  constructor(
    private platform:Platform
  ){}

  setUser(user){
    if(user == null){
      localStorage.removeItem(STORAGE_KEYS.user);
    }else{
      localStorage.setItem(STORAGE_KEYS.user,JSON.stringify(user))
    }
  }
  getUser(){
    let user = localStorage.getItem(STORAGE_KEYS.user);
    if (user == null) {
      return null;
    } else {
      return JSON.parse(user);

    }
  }

  getUserCredentials() {
    return this.platform.ready()
    .then(()=>{
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.userCredentials))
    })
  }

  setUserCredentials(usr:LocalUser) {
    return this.platform.ready().then(() => {
      return localStorage.setItem(STORAGE_KEYS.userCredentials,JSON.stringify(usr))
    })
  }

  getUserPerfil() {
    let perfil = localStorage.getItem(STORAGE_KEYS.perfil);
    if (perfil == null) {
      return null;
    } else {
      return JSON.parse(perfil);
    }
  }

  setUserPerfil(perfil) {
    if(perfil == null){
      localStorage.removeItem(STORAGE_KEYS.perfil);
    }else{
      localStorage.setItem(STORAGE_KEYS.perfil,JSON.stringify(perfil))
    }
  }
  getUserName() {
    let nome = localStorage.getItem(STORAGE_KEYS.nome);
    if (nome == null) {
      return null;
    } else {
      return JSON.parse(nome);
    }
  }

  setUserName(nome) {
    if(nome == null){
      localStorage.removeItem(STORAGE_KEYS.nome);
    }else{
      localStorage.setItem(STORAGE_KEYS.nome,JSON.stringify(nome))
    }
  }

  getPacienteId() {
    let pacienteId = localStorage.getItem(STORAGE_KEYS.pacienteId);
    if (pacienteId == null) {
      return null;
    } else {
      return JSON.parse(pacienteId);
    }
  }

  setPacienteId(pacienteId) {
    if(pacienteId == null){
      localStorage.removeItem(STORAGE_KEYS.pacienteId);
    }else{
      localStorage.setItem(STORAGE_KEYS.pacienteId,JSON.stringify(pacienteId))
    }
  }


  setUserUrlFoto(urlFoto) {
    if(urlFoto == null){
      localStorage.removeItem(STORAGE_KEYS.urlFoto);
    }else{
      localStorage.setItem(STORAGE_KEYS.urlFoto,JSON.stringify(urlFoto))
    }
  }

  getUserUrlFoto() {
    let urlFoto = localStorage.getItem(STORAGE_KEYS.urlFoto);
    if (urlFoto == null) {
      return null;
    } else {
      return JSON.parse(urlFoto);
    }
  }
  getUserFunction() {
    let funcao = localStorage.getItem(STORAGE_KEYS.funcao);
    if (funcao == null) {
      return null;
    } else {
      return JSON.parse(funcao);
    }
  }


  setUserFunction(funcao) {
    if(funcao == null){
      localStorage.removeItem(STORAGE_KEYS.funcao);
    }else{
      localStorage.setItem(STORAGE_KEYS.funcao,JSON.stringify(funcao))
    }
  }


  setEmail(email) {
    if(email == null){
      localStorage.removeItem(STORAGE_KEYS.email);
    }else{
      localStorage.setItem(STORAGE_KEYS.email,JSON.stringify(email))
    }

  }

  getEmail() {
    let email = localStorage.getItem(STORAGE_KEYS.email);
    if (email == null) {
      return "";
    } else {
      return JSON.parse(email);
    }
  }

  setCpf(cpf) {
    if(cpf == null){
      localStorage.removeItem(STORAGE_KEYS.cpf);
    }else{
      localStorage.setItem(STORAGE_KEYS.cpf,JSON.stringify(cpf))
    }

  }

  getCpf() {
    let cpf = localStorage.getItem(STORAGE_KEYS.cpf);
    if (cpf == null) {
      return "";
    } else {
      return JSON.parse(cpf);
    }
  }
  limparStorage(){
    const cpf = this.getCpf()
    localStorage.clear();
    this.setCpf(cpf)
  }
}
