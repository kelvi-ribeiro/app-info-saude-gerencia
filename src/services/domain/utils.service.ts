import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {
  brazilianTimeToDate(data:string){
    // Pega Mês
    // data.substr(data.indexOf('/')+1,data.lastIndexOf('/')-3)
    // Pega dia
    // data.substr(0,data.indexOf('/'))
    // Pega Ano
    // data.substr(data.lastIndexOf('/')+1,data.length -1 )
    let dataFormatada = new Date(parseInt(data.substr(data.lastIndexOf('/')+1,data.length -1 )),
    parseInt(data.substr(data.indexOf('/')+1,data.lastIndexOf('/')-3)) -1,
    parseInt(data.substr(0,data.indexOf('/')))
    );
      return dataFormatada.toISOString().substr(0, 10).split('/').reverse().join('-');
  }

  dateTimeToTime(data:string){
    return data.substr(data.indexOf(':')-2,data.length-1)
  }


}




