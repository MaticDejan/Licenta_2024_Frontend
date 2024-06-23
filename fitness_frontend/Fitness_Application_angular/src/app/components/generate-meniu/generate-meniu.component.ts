  import { HttpClient, HttpClientModule } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { Route, Router } from '@angular/router';
  import { TransportDataService } from '../../services/transport-data.service';
  import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
  import { MatOptionModule } from '@angular/material/core';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

  @Component({
    selector: 'app-generate-meniu',
    standalone: true,
    imports: [FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatOptionModule,HttpClientModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
    templateUrl: './generate-meniu.component.html',
    styleUrl: './generate-meniu.component.css'
  })
  
  export class GenerateMeniuComponent implements OnInit{


    AlimenteSelectate:any=[];
    user:any=[];
    userJSON:any=[];
    newMeniu!:FormGroup;
    totalProteine:number=0;
    totalCarbohidrati:number=0;
    totalZahar:number=0;
    totalGrasimi:number=0;
    totalCalorii:number=0;
    meniu:any;
    idMeniu:any;
    clienti:any=[];
    isAntrenor:any;
    private readonly apiUrlUser="https://localhost:7270/api/User/"
    private readonly apiUrlMeniu="https://localhost:7270/api/Meniu/";
    private readonly apiUrlProdusGramaj="https://localhost:7270/api/ProdusGramaj/";
    constructor(private router:Router,private http:HttpClient,private transport:TransportDataService,private formbuilder:FormBuilder) {
    }
    
    


    ngOnInit(): void {
      this.userJSON=localStorage.getItem("utilizatorId");
      this.user=JSON.parse(this.userJSON);
      this.onLoadAlimente();
      this.http.get(`${this.apiUrlUser}GetClienti?id=${this.user[0].Id}`).subscribe(data=>{
        this.clienti=data;
        console.log("Clienti",this.clienti);
      })
      this.isAntrenor=0;
      console.log(this.AlimenteSelectate);
      console.log(this.transport.getListaAlimenteSelectate());
      this.newMeniu=new FormGroup({
        nume:new FormControl(''),
        descriere: new FormControl(''),
        Client: new FormControl('')
      });
      
      this.AlimenteSelectate.forEach((aliment:any)=>{
        this.newMeniu.addControl(aliment.Nume,new FormControl('',[Validators.required, Validators.min(0)]));
      })
      this.calculNutritional();
      this.newMeniu.valueChanges.subscribe(() => {
        this.calculNutritional();
      });
    }

    antrenorMode(){
      this.isAntrenor=1;
    }

    userMode(){
      this.isAntrenor=0;
    }

    onLoadAlimente(){
      this.AlimenteSelectate=this.transport.getListaAlimenteSelectate();
    }

    limitToOne(checkboxId: string) {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox: any) => {
        if (checkbox.id !== checkboxId) {
          checkbox.checked = false;
        }
      });
    }
    
    onStergeAliment(aliment:any){
      this.transport.stergeListaAlimenteSelectate(aliment);
      this.onLoadAlimente();
      this.calculNutritional();
    }

    calculNutritional(){
      this.totalCalorii=0;
      this.totalCarbohidrati=0;
      this.totalGrasimi=0;
      this.totalProteine=0;
      this.totalZahar=0;
      this.calculCarbohidrati();
      this.calculGrasimi();
      this.calculKcal();
      this.calculProteine();
      this.calculZahar();
    }

    calculProteine(){
      this.AlimenteSelectate.forEach((aliment:any) => {
        const numeControl = aliment.Nume;
        const valoareControl = this.newMeniu.get(numeControl)?.value;
        if(valoareControl > 0){
          if(aliment.prajit == 1){
            this.totalProteine+=aliment.proteinePrajit*valoareControl/100;
          }
          else if(aliment.fiert == 1){
            this.totalProteine+=aliment.proteineFiert*valoareControl/100;
          }
          else{
            this.totalProteine+=aliment.proteine*valoareControl/100;
          }
        }
    })
        return this.totalProteine;
    }

    calculGrasimi(){
      this.AlimenteSelectate.forEach((aliment:any) => {
        const numeControl = aliment.Nume;
        const valoareControl = this.newMeniu.get(numeControl)?.value;
        if(valoareControl > 0){
          if(aliment.prajit == 1){
            this.totalGrasimi+=aliment.grasimiPrajit*valoareControl/100;
          }
          else if(aliment.fiert == 1){
            this.totalGrasimi+=aliment.grasimiFiert*valoareControl/100;
          }
          else{
            this.totalGrasimi+=aliment.grasimi*valoareControl/100;
          }
        }
    })
      return this.totalGrasimi;
    }

    calculCarbohidrati(){
      this.AlimenteSelectate.forEach((aliment:any) => {
        const numeControl = aliment.Nume;
        const valoareControl = this.newMeniu.get(numeControl)?.value;
        if(valoareControl > 0){
          if(aliment.prajit == 1){
            this.totalCarbohidrati+=aliment.carbohidratiPrajit*valoareControl/100;
          }
          else if(aliment.fiert == 1){
            this.totalCarbohidrati+=aliment.carbohidratiFiert*valoareControl/100;
          }
          else{
            this.totalCarbohidrati+=aliment.carbohidrati*valoareControl/100;
          }
        }
    })
      return this.totalCarbohidrati;
    }

    calculZahar(){
      this.AlimenteSelectate.forEach((aliment:any) => {
        const numeControl = aliment.Nume;
        const valoareControl = this.newMeniu.get(numeControl)?.value;
        if(valoareControl > 0){
          if(aliment.prajit == 1){
            this.totalZahar+=aliment.zaharPrajit*valoareControl/100;
          }
          else if(aliment.fiert == 1){
            this.totalZahar+=aliment.zaharFiert*valoareControl/100;
          }
          else{
            this.totalZahar+=aliment.zahar*valoareControl/100;
          }
        }
    })
      return this.totalZahar;
    }

    calculKcal(){

      this.AlimenteSelectate.forEach((aliment:any) => {
        const numeControl = aliment.Nume;
        const valoareControl = this.newMeniu.get(numeControl)?.value;
        if(valoareControl > 0){
          if(aliment.prajit == 1){
            this.totalCalorii+=aliment.kcalPrajit*valoareControl/100;
          }
          else if(aliment.fiert == 1){
            this.totalCalorii+=aliment.kcalFiert*valoareControl/100;
          }
          else{
            this.totalCalorii+=aliment.kcal*valoareControl/100;
          }
        }
    })
      return this.totalCalorii;
    }

    isPrajit(aliment:any){
      aliment.prajit=1;
      aliment.fiert=0;
      this.calculNutritional();
    }
    isFiert(aliment:any){
      aliment.prajit=0;
      aliment.fiert=1;
      this.calculNutritional();
    }
    isCrud(aliment:any){
      aliment.prajit=0;
      aliment.fiert=0;
      this.calculNutritional();
    }

    salveazaMeniu(){
      const body={
        nume:this.newMeniu.value.nume,
        descriere:this.newMeniu.value.descriere,
        idProduseGramaje:0,
        idUtilizator:this.user[0].Id,
        idCreator:0,
        kcal:this.totalCalorii,
        proteine:this.totalProteine,
        carboohidrati:this.totalCarbohidrati,
        zahar: this.totalZahar,
        grasimi:this.totalGrasimi
      } 
      var idAssignMeniu;
      var creator;
      if(this.isAntrenor == 1){
        idAssignMeniu= this.newMeniu.value.Client;
        creator=this.user[0].Id;
      }
      else{
        creator=this.user[0].Id;
        idAssignMeniu=this.user[0].Id;
      }
      this.addMeniu(this.newMeniu.value.nume,this.newMeniu.value.descriere,idAssignMeniu,
        this.totalCalorii,this.totalProteine,this.totalCarbohidrati,this.totalZahar,
        this.totalGrasimi,creator).subscribe(id=>{
        if(id !== null){
          this.idMeniu=id;
          console.log(id);
          this.AlimenteSelectate.forEach((aliment:any) => { 
            const numeControl = aliment.Nume;
            const valoareControl = this.newMeniu.get(numeControl)?.value;
            if(valoareControl > 0)
            {
              let crud = 0;
              if(aliment.prajit == 0 && aliment.fiert == 0){crud=1;}
              this.addProdusGramaj(aliment.Id,valoareControl,this.idMeniu,aliment.prajit,aliment.fiert,crud).subscribe(res=>{
                console.log(aliment);
              })
            }
        })
        alert("meniu creat cu succes");
        this.AlimenteSelectate.forEach((aliment:any)=>{
          this.transport.stergeListaAlimenteSelectate(aliment);
        })
        this.router.navigate(['Alimente']);
        }
      })
  }

  addMeniu(nume:any,descriere:any,idUtilizator:any,kcal:any,proteine:any,carbohidrati:any,zahar:any,grasimi:any,creator:any){
    return this.http.post(`${this.apiUrlMeniu}AdaugaMeniu?nume=${nume}&descriere=${descriere}&idProduseGramaje=0&idUtilizator=${idUtilizator}&idCreator=${creator}&kcal=${kcal}&proteine=${proteine}&carboohidrati=${carbohidrati}&zahar=${zahar}&grasimi=${grasimi}`,null)
  }
  addProdusGramaj(idProdus:any,gramaj:any,idmeniu:any,prajit:any,fiert:any,crud:any){
    return this.http.post(`${this.apiUrlProdusGramaj}AdaugaProdusGramaj?idProdus=${idProdus}&gramaj=${gramaj}&idMeniu=${idmeniu}&prajit=${prajit}&fiert=${fiert}&crud=${crud}`,null);
  }

  }
