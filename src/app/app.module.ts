import { AuthService } from '../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HandlerResponseProvider } from '../services/handler-response/handler-response';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ImageUtilService } from '../services/image-util.service';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LinhaCuidadoService } from '../services/domain/linha.cuidado.service';
import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { NotificacoesService } from '../services/domain/notificacoes.service';
import { PacienteService } from '../services/domain/paciente.service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { ValidadoresService } from '../services/utils/validadores.service';
import { ComponentsModule } from '../components/components.module';
import { PessoaService } from '../services/domain/pessoa.service';
import { MensagemService } from '../services/domain/mensagem.service';

@NgModule({
  declarations: [
    MyApp,
    
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
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
    ValidadoresService,
    PessoaService,
    MensagemService

  ]
})
export class AppModule {}
