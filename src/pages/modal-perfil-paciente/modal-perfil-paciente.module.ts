import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPerfilPacientePage } from './modal-perfil-paciente';
import { PipeModule } from '../../pipes/pipe.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ModalPerfilPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPerfilPacientePage),
    PipeModule,
    ComponentsModule
  ],
})
export class ModalPerfilPacientePageModule {}
