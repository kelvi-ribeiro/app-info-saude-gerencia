import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from "../storage.service";
import { ToastController,NavController, LoadingController } from "ionic-angular";




@Injectable()
export class NotificacoesService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public loadingCtrl:LoadingController

    ) {
  }

  presentToast(message:string,css:string,duration:number,position:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass:css
    });
    toast.present();
  }
  presentAlertDefault(title,message,page?,navCtrl?:NavController){
    let alert = this.alertCtrl.create({
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
    alert.present();
  }

  presentAlertJustMessage(title,message){
    let alert = this.alertCtrl.create({
      title:title,
      message:message,
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
        }
      ]
    });
    alert.present();
  }
  presentAlertErro(){
    let alert = this.alertCtrl.create({
      title:'Erro',
      message:'Ocorreu algum problema no nosso sistema, por favor, nos desculpe!',
      enableBackdropDismiss:false,
      buttons:[
        {
          text:'Ok',
        }
      ]
    });
    alert.present();
  }
  presentLoadingDefault(message) {
    let loading = this.loadingCtrl.create({
      content: message
    });
    loading.present();
    return loading;
  }

}




