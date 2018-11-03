import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMensagensPage } from './list-mensagens';

@NgModule({
  declarations: [
    ListMensagensPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMensagensPage),
  ],
})
export class ListMensagensPageModule {}
