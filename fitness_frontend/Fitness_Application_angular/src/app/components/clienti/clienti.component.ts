import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-clienti',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.css'
})
export class ClientiComponent implements OnInit {
  
  constructor(private http:HttpClient, private router:Router){

  }

  readonly APIUrl = "https://localhost:7270/api/User/";
  clienti:any=[];
  utilizatorJSON!:any;
  utilizator!:any;

  ngOnInit(): void {
    this.utilizatorJSON=localStorage.getItem("utilizatorId");
    this.utilizator=JSON.parse(this.utilizatorJSON);
    forkJoin([this.http.get(`${this.APIUrl}GetClienti?id=${this.utilizator[0].Id}`)]).subscribe(([clienti])=>{
      this.clienti=clienti;
    })
    
  }

  stergeClient(user:any){
    return this.http.patch(`${this.APIUrl}StergeAntrenor`,user);
  }
  
  onStergeClient(user:any){
    this.stergeClient(user).subscribe(()=>{
      alert("Client șters cu succes");
      this.onLoadClienti();
    })
  }

  onLoadClienti(){
    this.http.get(`${this.APIUrl}GetClienti?id=${this.utilizator[0].Id}`).subscribe(data=>{
      this.clienti=data;
    })
  }
  navigateTo(id:any){
    this.router.navigate(['profile',id]);
  }

}
