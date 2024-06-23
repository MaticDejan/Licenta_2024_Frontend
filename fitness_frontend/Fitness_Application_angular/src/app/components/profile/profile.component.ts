import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfileMyInfoComponent } from '../profile-my-info/profile-my-info.component';
import { ProfileAntrenamentComponent } from '../profile-antrenament/profile-antrenament.component';
import { ProfileMancareComponent } from '../profile-mancare/profile-mancare.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileMyInfoComponent,ProfileAntrenamentComponent,ProfileMancareComponent,MatCardModule,MatButtonModule], 
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private http:HttpClient,private router:ActivatedRoute){}
  private readonly APIurl  = "https://localhost:7270/api/User/";
  utilizatorJSON:any;
  utilizator:any;
  user:any=[];
  userId:any;
  filtru!:number;

  ngOnInit(): void {
    this.router.paramMap.subscribe(id=>{
      this.userId= id.get('userId');
      
    })  
    
    this.filtru=0;
  }
  
  filter(number:number){
    this.filtru=number;
  }
}
