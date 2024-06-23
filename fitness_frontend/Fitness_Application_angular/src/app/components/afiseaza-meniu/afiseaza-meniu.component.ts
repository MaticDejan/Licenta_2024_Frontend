import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-afiseaza-meniu',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './afiseaza-meniu.component.html',
  styleUrl: './afiseaza-meniu.component.css'
})
export class AfiseazaMeniuComponent implements OnInit {
  
meniuId!:any;
meniu:any=[];
gramaje:any=[];
produse:any=[];
counter:number=0;

private readonly apiUrlMeniu="https://localhost:7270/api/Meniu/";
private readonly apiUrlGramaje="https://localhost:7270/api/ProdusGramaj/";
private readonly apiUrlProduse="https://localhost:7270/api/Produs/";

  constructor(private router:ActivatedRoute,private http:HttpClient){

  }
  
  ngOnInit(): void {
    this.router.paramMap.subscribe(id=>{
      this.meniuId = id.get('meniuId');
    });

    forkJoin([this.http.get(`${this.apiUrlMeniu}GetMeniuById?id=${this.meniuId}`),
      this.http.get(`${this.apiUrlGramaje}GetProdusGramaj`),
    this.http.get(`${this.apiUrlProduse}GetProduse`)
    ]).subscribe(([meniuData,gramajData,produsData])=>{
      this.meniu=meniuData;
      this.gramaje=gramajData;
      this.produse=produsData;
      this.calculateGramaje();
    })
    this.calculateGramaje();
  }

  calculateGramaje(){
    for(let m of this.meniu)
    {
    for( let produs of this.produse ){
      for(let gramaj of this.gramaje){
        if(gramaj.idProdus == produs.Id && m.Id == gramaj.idMeniu && this.meniuId == gramaj.idMeniu){
          var gr=gramaj.gramaj/100;
          console.log(produs.Nume,gr);
          produs.proteine =produs.proteine*gr;  
          produs.carbohidrati=produs.carbohidrati*gr;
          produs.grasimi = produs.grasimi*gr;
          produs.zahar = produs.zahar*gr;
          produs.kcal=produs.kcal*gr;
          produs.proteineFiert*=gr;
          produs.carbohidratiFiert*=gr;
          produs.grasimiFiert*=gr;
          produs.zaharFiert*=gr;
          produs.kcalFiert*=gr;
          produs.proteinePrajit*=gr;
          produs.carbohidratiPrajit*=gr;
          produs.grasimiPrajit*=gr;
          produs.zaharPrajit*=gr;
          produs.kcalPrajit*=gr;
        }
      }
    }
    }
  }

}
