import { NgModule } from '@angular/core';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
import { DadosMedicosComponent } from './dados-medicos/dados-medicos';
import { DadosEnderecoComponent } from './dados-endereco/dados-endereco';
@NgModule({
	declarations: [DadosPessoaisComponent,
    DadosMedicosComponent,
    DadosEnderecoComponent],
	imports: [PipeModule,IonicModule],
	exports: [DadosPessoaisComponent,
    DadosMedicosComponent,
    DadosEnderecoComponent]
})
export class ComponentsModule {}
