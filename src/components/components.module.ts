import { NgModule } from '@angular/core';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [DadosPessoaisComponent],
	imports: [PipeModule,IonicModule],
	exports: [DadosPessoaisComponent]
})
export class ComponentsModule {}
