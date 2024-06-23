import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransportDataService } from '../../services/transport-data.service';
import { GenerateExercitiuComponent } from '../generate-exercitiu/generate-exercitiu.component';
import { TransportExercitiiService } from '../../services/transport-exercitii.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-exercitii',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './exercitii.component.html',
  styleUrl: './exercitii.component.css'
})
export class ExercitiiComponent implements OnInit{


  user:any=[];
  userJSON:any=[];
  listaExercitiiSelectate:any=[];
  exercitiiSelectate:number=0;

  exercitii:any=[];
  biceps:any=[];
  triceps:any=[];
  antebrat:any=[];
  piept:any=[];
  spate:any=[];
  cardio:any=[];
  umeri:any=[];
  gambe:any=[];
  coapse:any=[];
  abdomen:any=[];
  sporturi:any=[];

  filtruCategorie!:number;

  private readonly userAPI="https://localhost:7270/api/User/";
  private readonly ExercitiiAPI="https://localhost:7270/api/Exercitiu/";

  constructor(private http:HttpClient,private router:Router, private dialog: MatDialog,  
    private transport:TransportExercitiiService)
    {
    }

  ngOnInit(): void {
    this.userJSON=localStorage.getItem("utilizatorId");
    this.user=JSON.parse(this.userJSON);
    this.onLoadExercitii();
    this.filtruCategorie=0;

    this.listaExercitiiSelectate=this.transport.getListaExercitiiSelectate();
    if(this.listaExercitiiSelectate !== null){
    for(let a of this.listaExercitiiSelectate){this.exercitiiSelectate++;}
    }
    else {this.listaExercitiiSelectate = [];}
  }

  onFiltruCategorie(number:number){
    this.filtruCategorie=number;
  }

  
  newAntrenament(){
    this.router.navigate(['GenerateAntrenament']);
  }
   

  onLoadExercitii(){
    this.http.get(`${this.ExercitiiAPI}GetExercitii`).subscribe(data=>{
      this.exercitii=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetBicept`).subscribe(data=>{
      this.biceps=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetTriceps`).subscribe(data=>{
      this.triceps=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetAbdomen`).subscribe(data=>{
      this.abdomen=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetPiept`).subscribe(data=>{
      this.piept=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetSpate`).subscribe(data=>{
      this.spate=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetGambe`).subscribe(data=>{
      this.gambe=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetCoapse`).subscribe(data=>{
      this.coapse=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetAntebrat`).subscribe(data=>{
      this.antebrat=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetCardio`).subscribe(data=>{
      this.cardio=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetUmeri`).subscribe(data=>{
      this.umeri=data;
    });

    this.http.get(`${this.ExercitiiAPI}GetSporturi`).subscribe(data=>{
      this.sporturi=data;
    });

  }

  onAddExercitiu(){
    this.dialog.open(GenerateExercitiuComponent);
  }

  deleteExercitiu(id:any){
    return this.http.delete(`${this.ExercitiiAPI}DeleteExercitiu?Id=${id}`);
  }

  onDeleteAliment(id:any){
    this.deleteExercitiu(id).subscribe(res=>{
      alert("Aliment șters cu succes");
      this.onLoadExercitii();
    })
  }

  adaugaExercitiuAntrenament(exercitiu:any){
    let index = this.listaExercitiiSelectate.findIndex((a:any)=> a.Id == exercitiu.Id);
    if(index !== -1){

    }
    else{
      this.exercitiiSelectate++;
    this.listaExercitiiSelectate.push(exercitiu);
    console.log(exercitiu);
    exercitiu.selectat=0;
    this.transport.adaugaListaExercitiiSelectate(exercitiu);
    console.log(this.listaExercitiiSelectate);
    }
  }
  

  isSelectat(aliment:any){
    if(this.listaExercitiiSelectate == null){return false;}
    let index = this.listaExercitiiSelectate.findIndex((a:any)=>a.Id == aliment.Id);
    if(index == null)
      return false;
    if(index !== -1)
      return true;
    return false;
  }

  StergeExercitiuAntrenament(aliment:any){
    let index = this.listaExercitiiSelectate.findIndex((a:any)=>a.Id == aliment.Id);
    if(index !== -1){
      this.listaExercitiiSelectate.splice(index,1);
      this.exercitiiSelectate--;
      this.transport.stergeListaExercitiiSelectate(aliment);
    }
    this.listaExercitiiSelectate.filter();
    console.log(this.listaExercitiiSelectate);
  }

}
