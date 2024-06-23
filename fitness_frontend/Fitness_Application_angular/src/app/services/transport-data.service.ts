import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransportDataService {


  listaAlimenteSelectate:any=[];
  
  listaJSONAlimente:any=[];
  

  constructor() { 
    if(localStorage.getItem("alimenteSelectate") != null){
    this.listaJSONAlimente=localStorage.getItem("alimenteSelectate");
    this.listaAlimenteSelectate ? JSON.parse(this.listaJSONAlimente): [];
    }
    else
    {
      localStorage.setItem("alimenteSelectate","");
    }
  }
  

  adaugaListaAlimenteSelectate(aliment:any){
    let index=this.listaAlimenteSelectate.findIndex((a:any)=> a.Id == aliment.Id)
    if(index !== -1){

    }
    else{
      this.listaAlimenteSelectate.push(aliment);
      localStorage.setItem("alimenteSelectate",JSON.stringify(this.listaAlimenteSelectate));
    }
    
  }




  stergeListaAlimenteSelectate(aliment:any){
    let index=this.listaAlimenteSelectate.findIndex((a:any)=> a.Id == aliment.Id)
    if(index !== -1){
      this.listaAlimenteSelectate.splice(index,1);
      
      localStorage.setItem("alimenteSelectate",JSON.stringify(this.listaAlimenteSelectate));
    }
  }

  

  getListaAlimenteSelectate(){
    
    let alimentJSON:any=localStorage.getItem("alimenteSelectate");
    let aliment:any=JSON.parse(alimentJSON);
    return aliment;
  }

  


}
