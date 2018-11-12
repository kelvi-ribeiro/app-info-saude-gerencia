import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProfissionalSaudePage } from './list-profissional-saude';
import { ProfissionalSaudeService } from '../../services/domain/profissional.saude.service';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    ListProfissionalSaudePage,
  ],
  imports: [
    IonicPageModule.forChild(ListProfissionalSaudePage),
    PipeModule
  ],
  providers:[
    ProfissionalSaudeService
  ]
})
export class ListProfissionalSaudePageModule {}
