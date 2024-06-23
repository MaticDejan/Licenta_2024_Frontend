import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdaugaAlimentComponent } from '../adauga-aliment/adauga-aliment.component';
import { TransportDataService } from '../../services/transport-data.service';
import { AzureBlobService } from '../../services/azure-blob.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@Component({
    selector: 'app-alimente',
    standalone: true,
    templateUrl: './alimente.component.html',
    styleUrl: './alimente.component.css',
    imports: [MatCardModule,MatButtonModule]
})
export class AlimenteComponent implements OnInit {

  user:any=[];
  userJSON:any=[];
  alimente:any=[];
  carne:any=[];
  lactate:any=[];
  dulciuri:any=[];
  legume:any=[];
  fructe:any=[];
  seminte:any=[];
  diverse:any=[];


  
  filtruCategorie!:number;
  dummy!:number;
  alimenteSelectate:number=0;
  listaAlimenteSelectate:any=[];
  pozeAlimente:any=[];
  private readonly userAPI="https://localhost:7270/api/User/";
  private readonly ProdusAPI="https://localhost:7270/api/Produs/";
  constructor(private http:HttpClient,private router:Router, private dialog: MatDialog,  
  private transport:TransportDataService,private bolb:AzureBlobService)
  {
  }


  ngOnInit(): void {

    this.userJSON=localStorage.getItem("utilizatorId");
    this.user=JSON.parse(this.userJSON);
    this.onLoadAlimente();
    this.filtruCategorie=0;
    this.pozeAlimente=this.bolb.getAlimente();
    console.log(this.pozeAlimente);
    
    console.log(this.transport.getListaAlimenteSelectate());
    this.listaAlimenteSelectate=this.transport.getListaAlimenteSelectate();
    if(this.listaAlimenteSelectate !== null){
    for(let a of this.listaAlimenteSelectate){this.alimenteSelectate++;}
    }
    console.log(this.listaAlimenteSelectate);
    //if(this.listaAlimenteSelectate == null){localStorage.setItem("alimenteSelectate"," ");}
  }

  newMeniu(){
    this.router.navigate(['GenerateMeniu']);
  }

 

  onFiltruCategorie(number:number){
    this.filtruCategorie=number;
  }

  


  onLoadAlimente(){
    this.http.get(`${this.ProdusAPI}GetProduse`).subscribe(data=>{
      this.alimente=data;
    });

    this.http.get(`${this.ProdusAPI}GetCarne`).subscribe(data=>{
      this.carne=data;
    });

    this.http.get(`${this.ProdusAPI}GetDulciuri`).subscribe(data=>{
      this.dulciuri=data;
    });

    this.http.get(`${this.ProdusAPI}GetLactate`).subscribe(data=>{
      this.lactate=data;
    });

    this.http.get(`${this.ProdusAPI}GetFructe`).subscribe(data=>{
      this.fructe=data;
    });

    this.http.get(`${this.ProdusAPI}GetLegume`).subscribe(data=>{
      this.legume=data;
    });

    this.http.get(`${this.ProdusAPI}GetSeminte`).subscribe(data=>{
      this.seminte=data;
    });

    this.http.get(`${this.ProdusAPI}GetDiverse`).subscribe(data=>{
      this.diverse=data;
    });
  }

  onPrajit(aliment:any){
    aliment.prajit=1;
    aliment.fiert=0;
  }

  onFiert(aliment:any){
    aliment.prajit=0;
    aliment.fiert=1;
  }

  onCrud(aliment:any){
    aliment.prajit=0;
    aliment.fiert=0;
  }

  onAddAliment(){
    this.dialog.open(AdaugaAlimentComponent);
  }

  deleteAliment(id:any){
    return this.http.delete(`${this.ProdusAPI}DeleteProdus?Id=${id}`);
  }

  onDeleteAliment(id:any){
    this.deleteAliment(id).subscribe(res=>{
      alert("Aliment șters cu succes");
      this.onLoadAlimente();
    })
  }

  adaugaAlimentMeniu(aliment:any){
    let index = this.listaAlimenteSelectate.findIndex((a:any)=> a.Id == aliment.Id);
    if(index !== -1){

    }
    else{
      this.alimenteSelectate++;
    this.listaAlimenteSelectate.push(aliment);
    aliment.selectat=0;
    this.transport.adaugaListaAlimenteSelectate(aliment);
    console.log(this.listaAlimenteSelectate);
    }
    
  }

  isSelectat(aliment:any){

    let index = this.listaAlimenteSelectate.findIndex((a:any)=>a.Id == aliment.Id);
    if(index !== -1)
      return true;
    return false;
  }

  StergeAlimentMeniu(aliment:any){
    let index = this.listaAlimenteSelectate.findIndex((a:any)=>a.Id == aliment.Id);
    if(index !== -1){
      this.listaAlimenteSelectate.splice(index,1);
      this.alimenteSelectate--;
      this.transport.stergeListaAlimenteSelectate(aliment);
    }
    this.listaAlimenteSelectate.filter();
    console.log(this.listaAlimenteSelectate);
  }

}
