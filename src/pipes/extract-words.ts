
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MensagemReduzidaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'extractWords',
})
export class ExtractWords implements PipeTransform {
  transform(value: string, extractCount:number = 2): string | boolean
  {
    let arrayNome;
    if (value === null) {return false;}    
    if(value.split(' ').length === 1){return value;}
    if(value.split(' ').length > extractCount){
      arrayNome = value.split(' ')
      arrayNome = arrayNome.splice(0,value.length - 1)    
    }
    arrayNome = value.split(' ')
    arrayNome = arrayNome.splice(0,extractCount)        
    return arrayNome.toString().replace(/,/g,' ');
  }
}


