import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  readonly APIUrl = "https://localhost:7270/api/User/";
users: any =[];
admins: any=[];
antrenori:any=[];
utilizatori:any=[];
filtruUtilizatori?:number;
constructor(private form:FormBuilder, private router:Router,private http: HttpClient){}
  
ngOnInit(): void {
  this.onLoadUsers();
  this.filtruUtilizatori=0;
  }

onLoadUsers()
{
  this.http.get(`${this.APIUrl}GetUsers`).subscribe(data=>{
    this.users=data;
  })

  this.http.get(`${this.APIUrl}GetAdmin`).subscribe(data=>{
    this.admins=data;
  })

  this.http.get(`${this.APIUrl}GetAntrenor`).subscribe(data=>{
    this.antrenori=data;
  })

  this.http.get(`${this.APIUrl}GetUtilizator`).subscribe(data=>{
    this.utilizatori=data;
  })

}

onFiltruUtilizatori(Valoare:any)
{
  this.filtruUtilizatori=Valoare;
}

  adaugaAdmin(Id:any)
  {
    return this.http.post(`${this.APIUrl}adaugaRolAdmin`,Id);
  }

onadaugaAdmin(Id:any)
{
  this.adaugaAdmin(Id).subscribe(rol=>{
    this.onLoadUsers();
    alert("Admin adăugat cu succes");
  })
}

  stergeRolAntrenor(Id:any)
  {
    return this.http.post(`${this.APIUrl}stergeRolAntrenor`,Id);
  }
  onStergeRolAntrenor(Id:any)
  {
    this.stergeRolAntrenor(Id).subscribe(rol =>{
      this.onLoadUsers();
      alert("Rolul de antrenor a fost șters");
    })
  }

  adaugaRolAntrenor(Id:any)
  {
    return this.http.post(`${this.APIUrl}adaugaRolAntrenor`,Id);
  }
  onAdaugaRolAntrenor(Id:any)
  {
    this.adaugaRolAntrenor(Id).subscribe(rol=>{
      this.onLoadUsers();
      alert("Rolul de antrenor a fost adaugat");
    })
  }

  deleteUser(Id:any)
  {
    console.log(Id);
    return this.http.delete(`${this.APIUrl}DeleteUserContext?Id=${Id}`,Id);
  }


  onDeleteUser(Id:any){
    alert("Utilizator sters");
    this.deleteUser(Id).subscribe(res=>{
      this.onLoadUsers();
      alert("Utilizator șters cu succes");
    })
  }

  navigateTo(id:any){
    this.router.navigate(['profile',id]);
  }



}
