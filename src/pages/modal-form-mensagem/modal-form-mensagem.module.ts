import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalFormMensagemPage } from './modal-form-mensagem';

@NgModule({
  declarations: [
    ModalFormMensagemPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalFormMensagemPage),
  ],
})
export class ModalFormMensagemPageModule {}
