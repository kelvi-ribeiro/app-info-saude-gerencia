import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipeModule } from '../../pipes/pipe.module';
import { ComponentsModule } from '../../components/components.module';
import { EnderecoService } from '../../services/domain/endereco.service';
import { ModalPerfilPage } from './modal-perfil';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';
import { Camera } from '@ionic-native/camera';



@NgModule({
  declarations: [
    ModalPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPerfilPage),
    PipeModule,  
    ComponentsModule  
  ],
  providers:[
    EnderecoService,
    ProfissionalSaudeService,
    Camera
  ]
})
export class ModalPerfilPageModule {}
