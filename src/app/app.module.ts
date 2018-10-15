import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { HandlerResponseProvider } from '../services/handler-response/handler-response';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageUtilService } from '../services/image-util.service';
import { LoginPage } from '../pages/login/login';
import { NotificacoesService } from '../services/domain/notificacoes.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { PacienteService } from '../services/domain/paciente.service';
import { LinhaCuidadoService } from '../services/domain/linha.cuidado';

@NgModule({
  declarations: [
    MyApp,
    HomePage,    
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,    
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    HandlerResponseProvider,
    ImageUtilService,
    NotificacoesService,
    StorageService,
    UsuarioService,
    PacienteService,
    LinhaCuidadoService,
  ]
})
export class AppModule {}
