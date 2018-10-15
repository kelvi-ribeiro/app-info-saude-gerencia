import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';

/**
 * Generated class for the ListPacientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-pacientes',
  templateUrl: 'list-pacientes.html',
})
export class ListPacientesPage {
  pacienteNome:string;
  pacientes = [];
  pages;
  pageAtual = 0;
  totalPages;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pacienteService:PacienteService,
    private notificacoesService:NotificacoesService) {
  }

  ionViewDidLoad() {    
    this.findPacientes()
  }
  changePage(clickedPage){
  if(this.pageAtual === clickedPage) return 
  this.pageAtual = clickedPage
  this.findPacientes(this.pacienteNome,null,this.pageAtual)
  }

  nextPage(){
    if(this.pageAtual === this.totalPages) return
    this.pageAtual++;
    this.findPacientes(this.pacienteNome,null,this.pageAtual)
  }
  previousPage(){
    if(this.pageAtual === 0) return
    this.pageAtual--;
    
    this.findPacientes(this.pacienteNome,null,this.pageAtual)
  }

  findPacientes(pessoaNome?:string,linhaCuidadoId?:number,page?:number){
    this.pacienteService.findByPessoaNomePage(pessoaNome,linhaCuidadoId,page)
    .then(res=>{
      this.pacientes = res.content;   
      this.totalPages = res.totalPages   
      this.pages =  Array(res.totalPages).fill(res.totalPages).map((x,i)=>  i) /* Array(res.totalPages).fill(res.totalPages).map((x,i)=>i); // [0,1,2,3,4] */
      this.pages = this.pages.filter(res => res<=this.pageAtual+5 && res>=this.pageAtual-5)
    }).catch(()=>{
      this.notificacoesService.presentAlertErro();
    })
  }

}
