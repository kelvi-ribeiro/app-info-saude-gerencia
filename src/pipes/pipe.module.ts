import { NgModule } from '@angular/core';
import { FormatCpf } from './format-cpf';
import { ExtractWords } from './extract-words';

@NgModule({
	declarations: [FormatCpf,ExtractWords],
	imports: [],
	exports: [FormatCpf,ExtractWords]
})
export class PipeModule {}
