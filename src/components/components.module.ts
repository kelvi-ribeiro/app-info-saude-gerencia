import { NgModule } from '@angular/core';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais';
import { PipeModule } from '../pipes/pipe.module';
import { IonicModule } from 'ionic-angular';
import { DadosMedicosComponent } from './dados-medicos/dados-medicos';
import { DadosEnderecoComponent } from './dados-endereco/dados-endereco';
import { DadosContatoComponent } from './dados-contato/dados-contato';
import { SideMenuComponent } from './side-menu/side-menu';
import { FormDadosPessoaisComponent } from './form-dados-pessoais/form-dados-pessoais';
import { NaturalidadeService } from '../services/domain/naturalidade.service';
import { PacienteLinhaCuidadoService } from '../services/domain/paciente.linha.cuidado.service';
import { FormDadosMedicosComponent } from './form-dados-medicos/form-dados-medicos';
import { TipoSanguineoService } from '../services/domain/tipo.sanguineo.service';
import { FormDadosEnderecoComponent } from './form-dados-endereco/form-dados-endereco';
import { CidadeService } from '../services/domain/cidade.service';
import { ViaCepService } from '../services/domain/viaCep.service';
@NgModule({
	declarations: [DadosPessoaisComponent,
    DadosMedicosComponent,
    DadosEnderecoComponent,
    DadosContatoComponent,
    SideMenuComponent,
    FormDadosPessoaisComponent,
    FormDadosMedicosComponent,
    FormDadosEnderecoComponent],
	imports: [PipeModule,IonicModule],
	exports: [DadosPessoaisComponent,
    DadosMedicosComponent,
    DadosEnderecoComponent,
    DadosContatoComponent,
    SideMenuComponent,
    FormDadosPessoaisComponent,
    FormDadosMedicosComponent,
    FormDadosEnderecoComponent],
    providers:[
        NaturalidadeService,
        PacienteLinhaCuidadoService,
        TipoSanguineoService,
        CidadeService,
        ViaCepService
    ]
})
export class ComponentsModule {}
