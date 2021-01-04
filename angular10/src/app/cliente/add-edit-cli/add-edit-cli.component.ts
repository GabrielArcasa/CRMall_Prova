import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {HttpClient} from '@angular/common/http';
import {CEPReal} from 'src/app/cliente/CEPReal'

@Component({
  selector: 'app-add-edit-cli',
  templateUrl: './add-edit-cli.component.html',
  styleUrls: ['./add-edit-cli.component.css']
})

export class AddEditCliComponent implements OnInit {

  constructor(private service:SharedService , private http: HttpClient) { }
  readonly APICEPUrl="//viacep.com.br/ws/";
  @Input() cli:any;
  id_cliente: string;
  nome_cliente: string;
  datanasc_cliente: string;
  sexo_cliente: string;
  endereco_cliente: string;
  numero_cliente: string;
  cep_cliente: string;
  bairro_cliente: string;
  estado_cliente: string;
  cidade_cliente: string;
 CEP : CEPReal;
  ngOnInit(): void {
    this.id_cliente=this.cli.id_cliente;
    this.nome_cliente=this.cli.nome_cliente;
    this.datanasc_cliente=this.cli.datanasc_cliente;
    this.sexo_cliente=this.cli.sexo_cliente;
    this.endereco_cliente=this.cli.endereco_cliente;
    this.numero_cliente=this.cli.numero_cliente;
    this.cep_cliente=this.cli.cep_cliente;
    this.bairro_cliente=this.cli.bairro_cliente;
    this.estado_cliente=this.cli.estado_cliente;
    this.cidade_cliente=this.cli.cidade_cliente;
  }

  getCEPCliente(item){

      this.http.get<string>(this.APICEPUrl + item + "/json/unicode/").subscribe(data=> {       
        //["Localidade"]); 
     //   this.tempvalue = data.ToString();
     //   this.tempvalue = this.tempvalue.Replace("{","").Replace("}","");
        console.log(data);
        this.CEP = JSON.parse(data);
        this.cidade_cliente = this.CEP.Localidade;
        this.estado_cliente =this.CEP.uf;
        this.bairro_cliente = this.CEP.bairro;
        this.endereco_cliente =this.CEP.Logradouro;
        }
          );    
  }

  addCliente(){
var val = 
  { nome_cliente:  this.nome_cliente,
    datanasc_cliente: this.datanasc_cliente.split('/').reverse().join('-'),
    sexo_cliente: this.sexo_cliente,
    endereco_cliente: this.endereco_cliente,
    numero_cliente:this.numero_cliente,
    cep_cliente: this.cep_cliente,
    bairro_cliente: this.bairro_cliente,
    estado_cliente:  this.estado_cliente,
    cidade_cliente: this.cidade_cliente}
  
  this.service.addCliente(val).subscribe(res=>{alert(res.toString());
  });
}
  updateCliente(){
    var val = 
    { id_cliente: this.id_cliente,
      nome_cliente:  this.nome_cliente,
      datanasc_cliente: this.datanasc_cliente.split('/').reverse().join('-'),
      sexo_cliente: this.sexo_cliente,
      endereco_cliente: this.endereco_cliente,
      numero_cliente:this.numero_cliente,
      cep_cliente: this.cep_cliente,
      bairro_cliente: this.bairro_cliente,
      estado_cliente:  this.estado_cliente,
      cidade_cliente: this.cidade_cliente}
    
    this.service.updateCliente(val).subscribe(res=>{alert(res.toString());
    });
  }

}
