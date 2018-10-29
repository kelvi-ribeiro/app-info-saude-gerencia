import { Injectable } from "@angular/core";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController,NavController, LoadingController, Toast, Alert } from "ionic-angular";




@Injectable()
export class NotificacoesService {
  toast:Toast;
  alert: any
  constructor(        
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController

    ) {
  }

  presentToast(message:string,css:string,duration:number,position:string) {    
    if(this.toast && this.toast.instance){
      return            
    }
    this.toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass:css
    });
    this.toast.present();
  }
    
  presentAlertDefault(title,message,page?,navCtrl?:NavController){  
    if(this.verificarSeExisteAlertInstanciado()){
      return
    }
    this.alert = this.alertCtrl.create({
      title:title,
      message:message,
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
          handler:() =>{
            if(page){
              navCtrl.setRoot(page)
            }else{
              navCtrl.pop()
            }
          }
        }
      ]
    });
    this.alert.present();
  }

  presentAlertJustMessage(title,message){
    this.alert = this.alertCtrl.create({
      title:title,
      message:message,
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
        }
      ]
    });
    this.alert.present();
  }
  presentAlertErro(){
   if(this.verificarSeExisteAlertInstanciado()){
     return
   }
    this.alert = this.alertCtrl.create({
      title:'Erro',
      message:'Ocorreu algum problema no nosso sistema, por favor, nos desculpe!',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
        }
      ]
    });
    this.alert.present();
  }
  presentLoadingDefault(message) {
    let loading = this.loadingCtrl.create({
      content: message
    });
    loading.present();
    return loading;
  }
  verificarSeExisteAlertInstanciado(){
    if(this.alert && this.alert.instance){
      return true           
    }else{
      return false
    }
  }

}




