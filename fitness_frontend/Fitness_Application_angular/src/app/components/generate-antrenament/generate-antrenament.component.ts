import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransportExercitiiService } from '../../services/transport-exercitii.service';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-generate-antrenament',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatOptionModule,HttpClientModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
  templateUrl: './generate-antrenament.component.html',
  styleUrl: './generate-antrenament.component.css'
})
export class GenerateAntrenamentComponent implements OnInit {

constructor(private router:Router,private http:HttpClient,private transport:TransportExercitiiService,private formbuilder:FormBuilder){}

  private readonly apiUser="https://localhost:7270/api/User/";
  private readonly apiAntrenament="https://localhost:7270/api/Antrenament/";
  private readonly apiEfortExercitii="https://localhost:7270/api/ExercitiuEfort/";

  exercitiiSelectate:any=[];
  totalCalorii:any=0;
  user:any=[];
  userJSON:any=[];
  clienti:any=[];
  idAntrenament!:number;
  isAntrenor:any;
  
  newAntrenament!:FormGroup;

  ngOnInit(): void {
    this.userJSON=localStorage.getItem("utilizatorId");
    this.user=JSON.parse(this.userJSON);

    this.onLoadExercitii();

    this.http.get(`${this.apiUser}GetClienti?id=${this.user[0].Id}`).subscribe(data=>{
      this.clienti=data;
      console.log("Clienti",this.clienti);
    });

    this.totalCalorii=0;

    this.isAntrenor=0;
    this.newAntrenament=new FormGroup({
      Nume: new FormControl(''),
      Descriere: new FormControl(''),
      Client: new FormControl('')
    });

    this.exercitiiSelectate.forEach((exercitiu:any)=>{
      exercitiu.greutati=0;
      exercitiu.anduranta=0;
    })

    this.exercitiiSelectate.forEach((exercitiu:any)=>{

      const controlTimp=exercitiu.Nume+"timp";
      const controlSerii=exercitiu.Nume+"serii";
      const controlRepetari=exercitiu.Nume+"repetari";
      console.log(controlTimp);
      console.log(controlSerii);
      console.log(controlRepetari);

      this.newAntrenament.addControl(controlTimp,new FormControl('',[Validators.required, Validators.min(0)]));
      this.newAntrenament.addControl(controlSerii,new FormControl('',[Validators.required, Validators.min(0)]));
      this.newAntrenament.addControl(controlRepetari,new FormControl('',[Validators.required, Validators.min(0)]));
    })

    this.CalculCalorii();
      this.newAntrenament.valueChanges.subscribe(() => {
        this.CalculCalorii();
      });

  }

  antrenorMode(){
    this.isAntrenor=1;
  }

  userMode(){
    this.isAntrenor=0;
  }

  onStergeexercitiu(aliment:any){
    this.transport.stergeListaExercitiiSelectate(aliment);
    this.onLoadExercitii();
    this.CalculCalorii();
  }

  CalculCalorii(){
    this.totalCalorii=0;
    this.exercitiiSelectate.forEach((exercitiu:any)=>{
      const serii=exercitiu.Nume+"serii";
      const seriiControl = this.newAntrenament.get(serii)?.value;
      const repetari=exercitiu.Nume+"repetari";
      const repetariControl = this.newAntrenament.get(repetari)?.value;
      const timp=exercitiu.Nume+"timp";
      const timpControl = this.newAntrenament.get(timp)?.value;
      if(exercitiu.anduranta == 1){
        this.totalCalorii+=exercitiu.caloriiPer10Minute*timpControl/10;
      }
      else if(exercitiu.greutati == 1){
        this.totalCalorii+= exercitiu.caloriiPerRepetare*seriiControl*repetariControl;
      }

    })
    return this.totalCalorii;

  }

  onLoadExercitii(){
    this.exercitiiSelectate=this.transport.getListaExercitiiSelectate();
  }

  isAnduranta(exercitiu:any){
    exercitiu.anduranta=1;
    exercitiu.greutati=0;
  }
  isGreutati(exercitiu:any){
    exercitiu.anduranta=0;
    exercitiu.greutati=1;
  }

  salveazaAntrenament(){
    var idAssignAntrenament;
      var creator;
      if(this.isAntrenor == 1){
        idAssignAntrenament= this.newAntrenament.value.Client;
        creator=this.user[0].Id;
      }
      else{
        creator=this.user[0].Id;
        idAssignAntrenament=this.user[0].Id;
      }

      this.addAntrenament(this.newAntrenament.value.Nume,this.newAntrenament.value.Descriere,this.totalCalorii,idAssignAntrenament,creator).subscribe((Id: any)=>{
        if(Id !== null){
          this.idAntrenament=Id;
          this.exercitiiSelectate.forEach((exercitiu:any)=>{
            var serii=exercitiu.Nume+"serii";
            var seriiControl = this.newAntrenament.get(serii)?.value;
            var repetari=exercitiu.Nume+"repetari";
            var repetariControl = this.newAntrenament.get(repetari)?.value;
            var timp=exercitiu.Nume+"timp";
            var timpControl = this.newAntrenament.get(timp)?.value;
            if(!(timpControl > 0)){timpControl=0;}
            if(!(seriiControl > 0)){seriiControl=0;}
            if(!(repetariControl > 0)){repetariControl=0;}
            if(timpControl > 0 || (seriiControl > 0 && repetariControl > 0)){
              this.addEfortExercitiu(exercitiu.Id,this.idAntrenament,timpControl,seriiControl,repetariControl,exercitiu.greutati,exercitiu.anduranta).subscribe({

              });
            }
          })
          alert("Antrenament creat cu succes");
        this.exercitiiSelectate.forEach((exercitiu:any)=>{
          this.transport.stergeListaExercitiiSelectate(exercitiu);
        })
        this.router.navigate(['Exercitii']);
        }
      })



  }

  addAntrenament(Nume:any,Descriere:any,calorii:any,idUtilizator:any,idCreator:any)
  {
    return this.http.post(`${this.apiAntrenament}AdaugaAntrenament?Nume=${Nume}&Descriere=${Descriere}&calorii=${calorii}&idUtilizator=${idUtilizator}&idCreator=${idCreator}`,null)
  }
  addEfortExercitiu(idExercitiu:any,idAntrenament:any,timp:any,serii:any,repetari:any,greutati:any,anduranta:any)
  {
    return this.http.post(`${this.apiEfortExercitii}AdaugaExercitiuEfort?idExercitiu=${idExercitiu}&idAntrenament=${idAntrenament}&timp=${timp}&serii=${serii}&repetari=${repetari}&greutati=${greutati}&anduranta=${anduranta}`,null);
  }


}
