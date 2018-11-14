import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormModalObjectToSavePage } from './form-modal-object-to-save';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';
import { Camera} from '@ionic-native/camera';

@NgModule({
  declarations: [
    FormModalObjectToSavePage,
  ],
  imports: [
    IonicPageModule.forChild(FormModalObjectToSavePage),
  ],
  providers:[
    ProfissionalSaudeService,
    Camera   
  ],

})
export class FormModalObjectToSavePageModule {}
