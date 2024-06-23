import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransportExercitiiService {
  listaExercitiiSelectate:any=[];
  listaJSONExercitii:any=[];
  constructor()
  {
    if( localStorage.getItem("exercitiiSelectate") != null){
    this.listaJSONExercitii = localStorage.getItem("exercitiiSelectate");
    this.listaExercitiiSelectate = this.listaJSONExercitii ? JSON.parse(this.listaJSONExercitii) : [];
    }
    else{
      localStorage.setItem("exercitiiSelectate","")
    }
  }

  adaugaListaExercitiiSelectate(aliment:any){
    let index=this.listaExercitiiSelectate.findIndex((a:any)=> a.Id == aliment.Id);
    if(index !== -1){
      console.log(2);
    }
    else{
      console.log(3);
      this.listaExercitiiSelectate.push(aliment);
      localStorage.setItem("exercitiiSelectate",JSON.stringify(this.listaExercitiiSelectate));
    }
    
  }
  stergeListaExercitiiSelectate(aliment:any){
    let index=this.listaExercitiiSelectate.findIndex((a:any)=> a.Id == aliment.Id)
    if(index !== -1){
      this.listaExercitiiSelectate.splice(index,1);
      
      localStorage.setItem("exercitiiSelectate",JSON.stringify(this.listaExercitiiSelectate));
    }
  }

  getListaExercitiiSelectate(){
    
    let alimentJSON:any=localStorage.getItem("exercitiiSelectate");
    let aliment:any=JSON.parse(alimentJSON);
    return aliment;
  }
 

}
