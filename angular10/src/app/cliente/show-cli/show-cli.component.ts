import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-show-cli',
  templateUrl: './show-cli.component.html',
  styleUrls: ['./show-cli.component.css']
})
export class ShowCliComponent implements OnInit {

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.refreshCliList();
  }
  CliList :any=[];
ModalTitle:string;
 ActivateaddEditCliComp:boolean = false;
 cli: any;
  addClick(){
this.cli={  id_cliente:0,  nome_cliente:"" }
this.ModalTitle ="Adicionar Cliente";
this.ActivateaddEditCliComp=true;
  }

  CloseClick(){
this.ActivateaddEditCliComp =false;
this.refreshCliList();
  }

  deleteClick(item){
    if(confirm('Tem certeza que deseja deletar o Cliente : '+ item.nome_cliente + ' ??')){
      this.service.deleteCliente(item.id_cliente).subscribe(data=>{
        alert(data.toString());
      this.refreshCliList()
      })
    }
  }
  editClick(item){
this.cli = item;
this.ModalTitle = "Editando Cliente";
this.ActivateaddEditCliComp= true;
  }


  refreshCliList(){
    this.service.getCliList().subscribe(data=>{
      this.CliList=data;
    })
  }



}
