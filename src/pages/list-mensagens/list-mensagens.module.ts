import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMensagensPage } from './list-mensagens';
import { InteracaoService } from '../../services/domain/interacao.service';

@NgModule({
  declarations: [
    ListMensagensPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMensagensPage),
  ],
  providers:[
    InteracaoService
  ]
})
export class ListMensagensPageModule {}
