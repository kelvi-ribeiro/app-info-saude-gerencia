import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormModalCreatePacientePage } from './form-modal-create-paciente';

@NgModule({
  declarations: [
    FormModalCreatePacientePage,
  ],
  imports: [
    IonicPageModule.forChild(FormModalCreatePacientePage),
  ],
})
export class FormModalCreatePacientePageModule {}
