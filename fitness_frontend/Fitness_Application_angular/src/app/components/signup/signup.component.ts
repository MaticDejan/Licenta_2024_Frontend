import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AzureBlobService } from '../../services/azure-blob.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatOptionModule,HttpClientModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  users: any=[];
  selectedFile: File | null = null;
  
  readonly APIUrl = "https://localhost:7270/api/User/";
  constructor(private form:FormBuilder, private router:Router,private http: HttpClient,private azureblob : AzureBlobService){}
  utilizatorJSON!:any;
  utilizator!:any;
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      Nume: new FormControl(''),
      Prenume: new FormControl(''),
      Greutate:new FormControl('',[Validators.required, Validators.min(0)]),
      Inaltime:new FormControl('',[Validators.required, Validators.min(0)]),
      Varsta:new FormControl('',[Validators.required, Validators.min(0)]),
      Activitate:new FormControl(''),
      Antrenor:new FormControl(''),
      Activ:new FormControl(''),
      Admin:new FormControl(''),
      Email:new FormControl(''),
      Parola:new FormControl(''),
      gat:new FormControl('',[Validators.required, Validators.min(0)]),
      talie:new FormControl('',[Validators.required, Validators.min(0)]),
      antebrat:new FormControl('',[Validators.required, Validators.min(0)]),
      coapse:new FormControl('',[Validators.required, Validators.min(0)]),
      sex:new FormControl(''),
      indiceMasaCorporala: new FormControl(''),
      procentDeGrasime: new FormControl(''),
      greutateIdeala: new FormControl(''),
      necesarCaloric: new FormControl(''),
      idAntrenor: new FormControl(''),
      imagine: new FormControl('https://licenta0405dejan.blob.core.windows.net/pozestatice/femeieGenerica1.jpg')
    })
    this.http.get(`${this.APIUrl}GetUsers`).subscribe(data =>{
      this.users=data;
    });
    
    this.utilizatorJSON=localStorage.getItem("utilizatorId")
      this.utilizator=JSON.parse(this.utilizatorJSON);
    if(this.utilizator[0].Id){
      localStorage.setItem("utilizatorId",JSON.stringify(""));
      window.location.reload();
    }
    }
    
  
  
  signup(userObj:any){
    return this.http.post(`${this.APIUrl}signup`,userObj);
  }
    onSignUp() {
      
      var valid = 1;

      if (this.signUpForm.valid) {
          this.users.forEach((user: { Email: any; }) => {
              if (user.Email === this.signUpForm.value.Email) {
                  valid = 0;
              }
          });
          if (valid == 0) {
              alert("Acest email are deja asociat un cont");
          } else {
              this.signUpForm.value.Antrenor = 0;
              this.signUpForm.value.Activ = 0;
              this.signUpForm.value.Admin = 0;
              this.signUpForm.value.indiceMasaCorporala = 0;
              this.signUpForm.value.procentDeGrasime = 0;
              this.signUpForm.value.greutateIdeala = 0;
              this.signUpForm.value.necesarCaloric = 0;

              if (this.selectedFile == null) {
                  if (this.signUpForm.value.sex == "Femeie") {
                    this.signUpForm.patchValue({ imagine: "https://licenta0405dejan.blob.core.windows.net/pozestatice/femeieGenerica1.jpg" });
                  } else if (this.signUpForm.value.sex == "Barbat") {
                      this.signUpForm.value.imagine = "https://licenta0405dejan.blob.core.windows.net/pozestatice/barbatGeneric1.jpg";
                  }
              } else {
                  const containerName = 'alimente';
                  this.azureblob.uploadFile(containerName, this.selectedFile);
                  const fileUrl = this.azureblob.getFileUrl(containerName, this.selectedFile.name);
                  this.signUpForm.patchValue({ imagine: fileUrl });  
              }

              const formValue = this.signUpForm.value;

              console.log(formValue);
              this.signup(formValue).subscribe({
                  next: (res => {
                      console.log("merge5");
                      this.router.navigate(['login']);
                  }),
                  error: (err => {
                      alert(err.message);
                  })
              });
          }
      }
  }

  onFileChange(event: any): void {
      if (event.target.files && event.target.files.length > 0) {
          this.selectedFile = event.target.files[0];
      } else {
          this.selectedFile = null;
      }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  conectare()
  {
    this.router.navigate(['login']);
  }



}


