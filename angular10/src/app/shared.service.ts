import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="https://localhost:44376/api";

  constructor(private http:HttpClient) { }
  //getCliCEP(val:any):Object{
    //if (confirm("Caminho :"+ this.APICEPUrl + val + "/json"))
    //{
    //return 
    //}
  //}


  getCliList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+ '/clientes');
  }

  addCliente(val:any){
    return this.http.post(this.APIUrl+'/clientes',val)
  }
  updateCliente(val:any){
    return this.http.put(this.APIUrl+'/clientes',val)
  }
  deleteCliente(val:any){
        return this.http.delete(this.APIUrl+'/clientes/',val)
  }
}
