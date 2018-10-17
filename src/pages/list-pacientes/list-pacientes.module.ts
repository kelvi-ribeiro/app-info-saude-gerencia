import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPacientesPage } from './list-pacientes';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    ListPacientesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPacientesPage),
    PipeModule
  ],
})
export class ListPacientesPageModule {}
