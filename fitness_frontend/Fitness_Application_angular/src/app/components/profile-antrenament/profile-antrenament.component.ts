import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransportDataService } from '../../services/transport-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-antrenament',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './profile-antrenament.component.html',
  styleUrl: './profile-antrenament.component.css'
})
export class ProfileAntrenamentComponent implements OnInit {

constructor(private router:ActivatedRoute,private http:HttpClient,private transport:TransportDataService,private route:Router){}

private readonly apiAntrenament="https://localhost:7270/api/Antrenament/";
antrenamente:any=[];
userJSON!:any;
  user!:any;
  userId!:any;
  ngOnInit(): void {

    this.userJSON=localStorage.getItem("utilizatorId");
    this.user=JSON.parse(this.userJSON);
    console.log(this.user[0].Id);
    this.loadAntrenamente();

    this.router.paramMap.subscribe(params=>{
      this.userId= params.get('userId');
    })
    
    console.log(this.userId);

  }

  loadAntrenamente(){
    this.http.get(`${this.apiAntrenament}GetAntrenamente`).subscribe(data=>{
      this.antrenamente=data;
    });
  }

  deleteAntrenament(Id:any){
    return this.http.delete(`${this.apiAntrenament}DeleteAntrenament?Id=${Id}`);
  }

  onDeleteAntrenament(Id:any){
    this.deleteAntrenament(Id).subscribe(res=>{
      this.loadAntrenamente();
      alert("Antrenament șters cu succes");
    })
  }
  navigateTo(id:any){
    this.route.navigate(['Antrenament',id]);
  }
}
