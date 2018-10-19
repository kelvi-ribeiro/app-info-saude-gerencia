import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { StorageService } from '../services/storage.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  user
  constructor(
              public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public storageService:StorageService) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.storageService.getUser()){
        this.rootPage = 'ListPacientesPage'
      }else{
        this.rootPage = LoginPage
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
