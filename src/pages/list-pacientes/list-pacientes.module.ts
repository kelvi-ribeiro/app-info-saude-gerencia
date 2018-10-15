import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPacientesPage } from './list-pacientes';

@NgModule({
  declarations: [
    ListPacientesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPacientesPage),
  ],
})
export class ListPacientesPageModule {}
