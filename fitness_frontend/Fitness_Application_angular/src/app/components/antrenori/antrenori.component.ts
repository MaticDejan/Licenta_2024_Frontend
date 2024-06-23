import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-antrenori',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './antrenori.component.html',
  styleUrl: './antrenori.component.css'
})
export class AntrenoriComponent implements OnInit {

  constructor(private http:HttpClient,private cdr: ChangeDetectorRef,private router:Router){}

  antrenori:any=[];
  readonly APIUrl = "https://localhost:7270/api/User/";
  utilizatorJSON!:any;
  utilizator!:any;

  user:any=[];

  ngOnInit(): void {
    this.utilizatorJSON=localStorage.getItem("utilizatorId");
    this.utilizator=JSON.parse(this.utilizatorJSON);
    console.log(`id:${this.utilizator[0].Id}`);

    forkJoin([
      this.http.get(`${this.APIUrl}GetAntrenor`),
      this.http.get(`${this.APIUrl}GetUserById?id=${this.utilizator[0].Id}`)
    ]).subscribe(([antrenori,user])=>{
      this.antrenori=antrenori;
      this.user=user;
      console.log('user',user);
      console.log('user[0]',this.user[0]);
    });
  }

  adaugaAntrenor(user:any,idAntrenor:any){
    return this.http.patch(`${this.APIUrl}adaugaAntrenor?IdAntrenor=${idAntrenor}`,user,idAntrenor);
  }
  onAdaugaAntrenor(user:any,idAntrenor:any){
    this.adaugaAntrenor(user,idAntrenor).subscribe(()=>{
      alert("Antrenor adăugat cu succes");
      window.location.reload();
    })
  }
  
  stergeAntrenor(user:any){
    return this.http.patch(`${this.APIUrl}StergeAntrenor`,user);
  }
  
  onStergeAntrenor(user:any){
    this.stergeAntrenor(user).subscribe(()=>{
      alert("Antrenor șters cu succes");
      window.location.reload();
    })
  }
  navigateTo(id:any){
    this.router.navigate(['profile',id]);
  }

}
