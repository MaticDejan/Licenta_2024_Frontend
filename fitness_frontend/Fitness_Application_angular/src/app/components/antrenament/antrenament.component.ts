import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-antrenament',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './antrenament.component.html',
  styleUrl: './antrenament.component.css'
})
export class AntrenamentComponent implements OnInit{
  constructor(private router:ActivatedRoute,private http:HttpClient){}

  private readonly apiAntrenament="https://localhost:7270/api/Antrenament/";
  private readonly apiEfortExercitii="https://localhost:7270/api/ExercitiuEfort/";
  private readonly ExercitiiAPI="https://localhost:7270/api/Exercitiu/";

  antrenamentId!:any;
  antrenament:any=[];
  efort:any=[];
  exercitiu:any=[];

  ngOnInit(): void {
    this.router.paramMap.subscribe(id=>{
      this.antrenamentId = id.get('antrenamentId');
    });

    forkJoin([this.http.get(`${this.apiAntrenament}GetAntrenamente`),this.http.get(`${this.apiEfortExercitii}GetExercitiuEfort`),
    this.http.get(`${this.ExercitiiAPI}GetExercitii`)
    ]).subscribe(([dataAntrenament,dataEfort,dataExercitiu])=>{
      this.antrenament=dataAntrenament;
      this.efort=dataEfort;
      this.exercitiu=dataExercitiu;
      this.calculateCalorii();
    })


   
  }
  
  calculateCalorii(){
    for(let ant of this.antrenament){
      for( let ex of this.exercitiu){
        for( let ef of this.efort){
          if(ef.idExercitiu == ex.Id && ant.Id == ef.idAntrenament && this.antrenamentId == ef.idAntrenament){
            console.log(ex.Nume,ef.timp,ef.serii,ef.repetari,ant.Id,ef.idAntrenament);
            if(ef.anduranta == 1){
              ex.caloriiPer10Minute=ex.caloriiPer10Minute*ef.timp/10;
            }
            else if(ef.greutati == 1){
              ex.caloriiPerRepetare=ex.caloriiPerRepetare*ef.serii*ef.repetari;
            }
          }
        }
      }
    }
  }
  
  
}
