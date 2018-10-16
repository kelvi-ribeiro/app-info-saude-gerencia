
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { CreadenciaisDTO } from '../../models/credenciais.dto';
import { UsuarioService } from '../../services/domain/usuario.service';
import { StorageService } from '../../services/storage.service';

import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  perfis = [];
  creds : CreadenciaisDTO = {
    cpf: "",
    senha: "123"
  };

  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;
  cpfValido;
  hasFingerprint;
  typeSenha: any = 'password';

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public usuarioService:UsuarioService,
    public storageService:StorageService,         
    public notificacoesService:NotificacoesService) {

      this.creds.cpf = this.format('95159191003')
      //this.creds.cpf = this.format(storageService.getCpf());
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
 
  exibirSenhaInput(){
    if(this.typeSenha == 'password'){
      this.typeSenha = 'text'
      return;
    }
    this.typeSenha = 'password';

  }
  validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF === "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11), 10)) return false;
    return true;
}
  login() {
    const loading = this.notificacoesService.presentLoadingDefault('Autenticando...')
    const cpfSemFormatacao = this.retirarFormatacao(this.creds.cpf)
    if(this.validarCPF(cpfSemFormatacao)){
      const creds:CreadenciaisDTO = {
        cpf:cpfSemFormatacao,
        senha:this.creds.senha
      }
      this.auth.authenticate(creds)
        .subscribe(response => {
          loading.dismiss()
          this.auth.successfulLogin(response.headers.get('Authorization'))
          .then(()=>{                          
            this.auth.obterDadosPerfil()
            .then(()=>{              
              this.navCtrl.setRoot(HomePage)
            }).catch(()=>{              
              this.notificacoesService.presentAlertJustMessage('Sem permissão','Você não tem acesso esse sistema')
            })
          }).catch(()=>{
            this.notificacoesService.presentAlertErro()
          });
        }, error => {                
           loading.dismiss();
           this.tratarErro(error);
          })
    }else{
      loading.dismiss();
      this.notificacoesService.presentAlertJustMessage('Falha!','CPF Inválido')
    }
  }
  tratarErro(error){
    if(error.status==401){
      this.notificacoesService.presentAlertJustMessage('Login ou senha incorreto','Favor, Verifique suas credenciais')
    }
    else if(error.status == 404 ||  error.status == 500){
    this.notificacoesService.presentAlertJustMessage('Servidor indisponível','Contate a equipe de suporte')
    }else if (error.status == 0){
      this.notificacoesService.presentAlertJustMessage('Problema na conexão','Verifique sua conexão com a internet')
    }
  }

 
  salvarLogin(cpf){
    this.storageService.setCpf(cpf)
  }  

  retirarFormatacao(cpfFormatado) {
     return  cpfFormatado.replace(/(\.|\/|\-)/g,"");
}

format(valString) {
  if (!valString) {
      return '';
  }
  let val = valString.toString();
  const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
  this.pureResult = parts;
  if(parts[0].length <= 11){
    this.maskedId = this.cpf_mask(parts[0]);
    this.cpfValido = this.pureResult;
    return this.maskedId;
  }else{
    return this.cpfValido;
  }
};
cpf_mask(v) {
  v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
  //de novo (para o segundo bloco de números)
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
  return v;
  }

  unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
  }
}
