import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,HttpClientModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  setareActiv!:any;
  constructor(private http: HttpClient, private router:Router){
  }
  utilizatorJSON!:any;
  utilizator!:any;

  ngOnInit():void{
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      parola: new FormControl(''),
      Nume: new FormControl(''),
      Prenume: new FormControl(''),
      Greutate:new FormControl(''),
      Inaltime:new FormControl(''),
      Varsta:new FormControl(''),
      Activitate:new FormControl(''),
      Antrenor:new FormControl(''),
      Activ:new FormControl(''),
      Admin:new FormControl(''),
      imagine:new FormControl('')
    });
    

    this.utilizatorJSON=localStorage.getItem("utilizatorId")
      this.utilizator=JSON.parse(this.utilizatorJSON);
    if(this.utilizator[0].Id){
      localStorage.setItem("utilizatorId",JSON.stringify(""));
      window.location.reload();
    }

  }
  utilizatorId!:any;
  readonly APIUrl = "https://localhost:7270/api/User/";

login(userObj:any){
  return this.http.post(`${this.APIUrl}login`,userObj);
}
 onLogin(){
    if(this.loginForm.valid){
      this.http.get(`${this.APIUrl}GetUserByEmail?Email=${this.loginForm.value.email}`).subscribe({
        next:(data:any)=>{
          
          this.login(this.loginForm.value).subscribe({
            next:(res)=>{
              if(data){
            
                localStorage.setItem("utilizatorId",JSON.stringify(data));
                localStorage.setItem("alimenteSelectate",JSON.stringify([]));
                localStorage.setItem("exercitiiSelectate",JSON.stringify([]));
                
              }
              console.log(data[0]);
              this.router.navigate(['profile',data[0].Id]).then(()=>{window.location.reload();});
            },
            error:(err)=>{
              console.log(err)
              alert("Nu merge")
            }
          })
        }
      })
      
      
    }
  }
  conectare(){
    this.router.navigate(['signup']);
  }
}
