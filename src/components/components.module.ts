import { NgModule } from '@angular/core';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
import { DadosMedicosComponent } from './dados-medicos/dados-medicos';
import { DadosEnderecoComponent } from './dados-endereco/dados-endereco';
import { DadosContatoComponent } from './dados-contato/dados-contato';
import { SideMenuComponent } from './side-menu/side-menu';
import { FormDadosPessoaisComponent } from './form-dados-pessoais/form-dados-pessoais';
@NgModule({
	declarations: [DadosPessoaisComponent,
    DadosMedicosComponent,
    DadosEnderecoComponent,
    DadosContatoComponent,
    SideMenuComponent,
    FormDadosPessoaisComponent],
	imports: [PipeModule,IonicModule],
	exports: [DadosPessoaisComponent,
    DadosMedicosComponent,
    DadosEnderecoComponent,
    DadosContatoComponent,
    SideMenuComponent,
    FormDadosPessoaisComponent]
})
export class ComponentsModule {}
