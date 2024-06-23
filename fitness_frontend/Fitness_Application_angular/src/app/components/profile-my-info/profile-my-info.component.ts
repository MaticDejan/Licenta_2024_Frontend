import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserDataComponent } from '../update-user-data/update-user-data.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-profile-my-info',
  standalone: true,
  imports: [UpdateUserDataComponent,MatCardModule,MatButtonModule],
  templateUrl: './profile-my-info.component.html',
  styleUrl: './profile-my-info.component.css'
})
export class ProfileMyInfoComponent implements OnInit {
  constructor(private http:HttpClient,private router:ActivatedRoute, private dialog: MatDialog){}
  private readonly APIurl  = "https://localhost:7270/api/User/";
  utilizatorJSON:any;
  utilizator:any;
  user:any=[];
  userId:any;
  imcUser!:number;
  greutateIdeala!:any;
  necesarCaloric!:any;
  idUserLogat!:any;
  userInaltime!:any;
  userGreutate!:any;

  greutateIdealaJos!:any;
  greutateIdealaSus!:any;
  necesarCaloricJos!:any;
  necesarCaloricSus!:any;
  
  ngOnInit(): void {
    this.utilizatorJSON=localStorage.getItem("utilizatorId");
    this.utilizator=JSON.parse(this.utilizatorJSON);
    this.idUserLogat=this.utilizator[0].Id;
    this.router.paramMap.subscribe(id=>{
      this.userId= id.get('userId');
      this.http.get(`${this.APIurl}GetUserById?Id=${this.userId}`)
      .subscribe((data:any)=>{
        this.user=data;
        
        this.imcUser=this.user[0].indiceMasaCorporala;  
        this.greutateIdeala=this.user[0].greutateIdeala;
        this.necesarCaloric=this.user[0].necesarCaloric;
        this.userInaltime=this.user[0].Inaltime;
        this.greutateIdealaJos = (this.userInaltime)*(this.userInaltime)*18.5/10000;
        this.greutateIdealaSus = this.userInaltime*this.userInaltime*24.9/10000;
        this.necesarCaloricJos = this.necesarCaloric + 500;
        this.necesarCaloricSus = this.necesarCaloric - 500; 
        this.userGreutate=this.user[0].Greutate;
      });
    })
  }
  updateUser(){
    this.dialog.open(UpdateUserDataComponent);
  }

imc(user:any){
  return this.http.patch(`${this.APIurl}calculIMC`,user);
}

onImc(user:any){

  this.imc(user).subscribe({
    next:(res)=>{
        
      alert("Indicele de masă corporală a fost calculat cu succes");
      this.http.get(`${this.APIurl}GetUserById?Id=${this.userId}`).subscribe((data:any)=>{
        this.imcUser=data[0].indiceMasaCorporala;
      });
    },
    error:(err)=>{

      if(err.status == 466){alert("Greutatea sau înălțimea pe care le-ați setat în contul dumneavoastră nu sunt valide. Pentru a vă putea calcula indicele de masă corporal trebuie să introduceți valori pozitive, mai mari decat 0.")}
      else{alert("Utilizatorul nu se află în baza de date");}
    }
  });

}
greutateIdealaUser(user:any){
  return this.http.patch(`${this.APIurl}calculGreutateIdeala`,user);
}

onGreutateIdealaUser(user:any){
  this.greutateIdealaUser(user).subscribe({
    next:(res)=>{
      alert("Greutatea ta ideală a fost calculată cu succes");
      this.http.get(`${this.APIurl}GetUserById?Id=${this.userId}`).subscribe((data:any)=>{
        this.greutateIdeala=data[0].greutateIdeala;
      });
    },
    error:(err)=>{

      if(err.status == 466){alert("Te rugam să completezi sexul tău alegând în profilul tău una din urmatoarele: bărbat sau femeie")}
      else{alert("Utilizatorul nu se află în baza de date");}
    }
  });

}

necesarCaloricUser(user:any){
  return this.http.patch(`${this.APIurl}necesarCaloric`,user);
}

onNecesarCaloricUser(user:any){
  this.necesarCaloricUser(user).subscribe({
    next:(res)=>{
      alert("Necesarul tau caloric a fost calculat cu succes");
      this.http.get(`${this.APIurl}GetUserById?Id=${this.userId}`).subscribe((data:any)=>{
        this.necesarCaloric=data[0].necesarCaloric;
      });
    },
    error:(err)=>{

      if(err.status == 466){alert("Te rugam sa completezi sexul tau alegand in profilul tau una din urmatoarele: barbat sau femeie")}
      else{alert("Utilizatorul nu se afla in baza de date");}
    }
  });

}


}
