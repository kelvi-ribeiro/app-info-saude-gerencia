import { NgModule } from '@angular/core';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
import { DadosMedicosComponent } from './dados-medicos/dados-medicos';
@NgModule({
	declarations: [DadosPessoaisComponent,
    DadosMedicosComponent],
	imports: [PipeModule,IonicModule],
	exports: [DadosPessoaisComponent,
    DadosMedicosComponent]
})
export class ComponentsModule {}
