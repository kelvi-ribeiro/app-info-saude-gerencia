import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormModalObjectToSavePage } from './form-modal-object-to-save';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';


@NgModule({
  declarations: [
    FormModalObjectToSavePage,
  ],
  imports: [
    IonicPageModule.forChild(FormModalObjectToSavePage),
  ],
  providers:[
    ProfissionalSaudeService
  ]
})
export class FormModalObjectToSavePageModule {}
