import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportDataService } from '../../services/transport-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-mancare',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './profile-mancare.component.html',
  styleUrl: './profile-mancare.component.css'
})
export class ProfileMancareComponent implements OnInit{
  constructor(private router:ActivatedRoute,private http:HttpClient,private transport:TransportDataService,private route:Router){}

  private readonly apuUrlMeniu="https://localhost:7270/api/Meniu/";
  userJSON!:any;
  user!:any;
  meniuri:any=[];
  userId!:any;
  ngOnInit(): void {
    this.userJSON=localStorage.getItem("utilizatorId");
    this.user=JSON.parse(this.userJSON);
    console.log(this.user[0].Id);
    
    this.loadMeniuri();
    this.router.paramMap.subscribe(id=>{
      this.userId= id.get('userId');
    })
    console.log(this.userId);
  }

  loadMeniuri(){
this.http.get(`${this.apuUrlMeniu}GetMeniuri`).subscribe(data=>{
  this.meniuri=data;
})
  }

  stergereMeniu(Id:number){
    return this.http.delete(`${this.apuUrlMeniu}DeleteMeniu?Id=${Id}`);
  }

  onStergereMeniu(Id:number){
    this.stergereMeniu(Id).subscribe(res=>{
      alert("Meniu șters cu succes");
      this.loadMeniuri();
    })
  }

  navigateTo(id:any){
    this.route.navigate(['meniu',id]);
  }

}
