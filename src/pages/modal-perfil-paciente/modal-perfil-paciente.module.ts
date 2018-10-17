import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPerfilPacientePage } from './modal-perfil-paciente';

@NgModule({
  declarations: [
    ModalPerfilPacientePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPerfilPacientePage),
  ],
})
export class ModalPerfilPacientePageModule {}
