import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { PacienteService } from '../../services/domain/paciente.service';
import { NotificacoesService } from '../../services/domain/notificacoes.service';
import { LinhaCuidadoService } from '../../services/domain/linha.cuidado.service';
import { ValidadoresService } from '../../services/utils/validadores.service';

@IonicPage()
@Component({
  selector: 'page-list-pacientes',
  templateUrl: 'list-pacientes.html',
})
export class ListPacientesPage {
  campoPesquisa:string;
  pacientes = [];
  pages;
  pageAtual = 0;
  totalPages;  
  linhasCuidado = [];
  linhaCuidadoId;
  
  @ViewChild('slidesLinhasCuidado') slidesLinhasCuidado: Slides;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private pacienteService:PacienteService,
    private linhaCuidadoService:LinhaCuidadoService,
    private notificacoesService:NotificacoesService,
    private validadoresService:ValidadoresService
    ) {
  }

  ionViewDidLoad() {    
    this.findPacientes()  
    this.findLinhasCuidado()  
  }
  slideChanged(){
    if(this.slidesLinhasCuidado.getActiveIndex() === 0){
      this.linhaCuidadoId = ''
    }
    
    if(this.slidesLinhasCuidado.getActiveIndex()  === this.linhasCuidado.length){
      return
    }
    this.linhaCuidadoId = this.slidesLinhasCuidado.getActiveIndex() 
    this.findPacientes(this.campoPesquisa,this.linhaCuidadoId,this.pageAtual) 
  }
  findLinhasCuidado(){
    this.linhaCuidadoService.findAll()
    .then(res=>{
      this.linhasCuidado = res
      this.linhasCuidado.unshift({id:0,nome:'Todas',caminhoImagem:'assets/imgs/todas.png'});
    })
  }
  changePage(clickedPage){
  if(this.pageAtual === clickedPage) return 
  this.pageAtual = clickedPage
  this.findPacientes(this.campoPesquisa,this.linhaCuidadoId,this.pageAtual)
  }

  nextPage(){
    if(this.pageAtual === this.totalPages) return
    this.pageAtual++;
    this.findPacientes(this.campoPesquisa,this.linhaCuidadoId,this.pageAtual)
  }
  previousPage(){
    if(this.pageAtual === 0) return
    this.pageAtual--;
    
    this.findPacientes(this.campoPesquisa,this.linhaCuidadoId,this.pageAtual)
  }
  openActions(paciente){
    paciente.actionOpened =  paciente.actionOpened ? false : true
  }

  findPacientes(campoPesquisa?:string,linhaCuidadoId?:number,page?:number){
    this.pacienteService.findPessoaByAnyField(campoPesquisa,linhaCuidadoId,page)
    .then(res=>{
      this.pacientes = res.content;             
      this.totalPages = res.totalPages   
      this.pages =  Array(res.totalPages).fill(res.totalPages).map((x,i)=>  i) /* Array(res.totalPages).fill(res.totalPages).map((x,i)=>i); // [0,1,2,3,4] */
      this.pages = this.pages.filter(res => res<=this.pageAtual+5 && res>=this.pageAtual-5)
    }).catch(()=>{
      this.notificacoesService.presentAlertErro();
    })
  }  
  returnPathImageByLinhaCuidadoId(){
    if(this.linhasCuidado.length <= this.slidesLinhasCuidado.getActiveIndex()){
      return this.linhasCuidado[this.linhasCuidado.length -1].caminhoImagem
    }
    const linhaCuidadoAtiva = this.linhasCuidado[this.slidesLinhasCuidado.getActiveIndex()]    
    if(linhaCuidadoAtiva !== undefined){
      return linhaCuidadoAtiva.caminhoImagem
    }
      
    
    
    //return this.linhasCuidado[this.slidesLinhasCuidado.getActiveIndex()].caminhoImagem
  }
}
