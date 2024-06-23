import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent implements OnInit {
  IdUtilizator!:any;
  Nume!:any;
  Prenume!:any;
  utilizatorJSON!:any;
  utilizator!:any;
  request: any =[];
  activ!: number;
  private readonly APIurl  = "https://localhost:7270/api/User/";

  constructor(private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    this.utilizatorJSON=localStorage.getItem("utilizatorId")
      this.utilizator=JSON.parse(this.utilizatorJSON);
      if(this.utilizator[0].Id){
        this.http.get(`${this.APIurl}GetUserById?Id=${this.utilizator[0].Id}`).subscribe(data=>{
          this.request=data;
        })
        this.Nume=this.request.Nume;
        this.Prenume=this.request.Prenume;
      }
      
      if(this.utilizator[0].Id > 0){
        this.activ=1;
      }
      else{
        this.activ=0;
      }
      console.log("activ",this.activ)
      this.IdUtilizator=this.utilizator[0].Id;
    
  }
  onReset(){
    this.utilizator[0].Activ=0;
    this.activ=0;
  }
  

  

  LogOut(id:any)
  {
    
    return this.http.post(`${this.APIurl}utilizatorInactiv`,id);
  }

onLogOut(Id:any)
{
  
  this.LogOut(Id).subscribe(rol=>{
    alert("LogOut");
    this.onReset();
    localStorage.setItem("utilizatorId",JSON.stringify(""));
    console.log(this.utilizator[0]);
    console.log("merge :D");
    this.router.navigate(['login']);
  })
}

reloadPage(){
  window.location.reload();
}




}
