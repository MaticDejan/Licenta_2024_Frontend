import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AzureBlobService } from '../../services/azure-blob.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-user-data',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatOptionModule,HttpClientModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
  templateUrl: './update-user-data.component.html',
  styleUrl: './update-user-data.component.css'
})
export class UpdateUserDataComponent implements OnInit {

  constructor(private http:HttpClient,private dialog: MatDialog,private router:Router,private azureblob : AzureBlobService){}
  selectedFile: File | null = null;
  updateForm!:FormGroup;
  IdUtilizator!:any;
  Nume!:any;
  Prenume!:any;
  utilizatorJSON!:any;
  utilizator!:any;
  request: any =[];
  newUtilizator:any=[];
  newUtilizatorJSON:any=[];
  private readonly APIurl  = "https://localhost:7270/api/User/";
  
  ngOnInit(): void {

    this.utilizatorJSON=localStorage.getItem("utilizatorId")
      this.utilizator=JSON.parse(this.utilizatorJSON);
      this.http.get(`${this.APIurl}GetUserById?Id=${this.utilizator[0].Id}`).subscribe(data=>{
        this.request=data
      })

      this.updateForm = new FormGroup({
      Id: new FormControl(this.utilizator[0].Id),
      Nume: new FormControl(this.utilizator[0].Nume),
      Prenume: new FormControl(this.utilizator[0].Prenume),
      Greutate:new FormControl(this.utilizator[0].Greutate,[Validators.required, Validators.min(0)]),
      Inaltime:new FormControl(this.utilizator[0].Inaltime,[Validators.required, Validators.min(0)]),
      Varsta:new FormControl(this.utilizator[0].Varsta,[Validators.required, Validators.min(0)]),
      Activitate:new FormControl(this.utilizator[0].Activitate),
      Antrenor:new FormControl(this.utilizator[0].Antrenor),
      Activ:new FormControl(this.utilizator[0].Activ),
      Admin:new FormControl(this.utilizator[0].Admin),
      Email:new FormControl(this.utilizator[0].Email),
      Parola:new FormControl(this.utilizator[0].Parola),
      gat:new FormControl(this.utilizator[0].gat,[Validators.required, Validators.min(0)]),
      talie:new FormControl(this.utilizator[0].talie,[Validators.required, Validators.min(0)]),
      antebrat:new FormControl(this.utilizator[0].antebrat,[Validators.required, Validators.min(0)]),
      coapsa:new FormControl(this.utilizator[0].coapsa,[Validators.required, Validators.min(0)]),
      sex:new FormControl(this.utilizator[0].sex),
      indiceMasaCorporala: new FormControl(this.utilizator[0].indiceMasaCorporala),
      procentDeGrasime: new FormControl(this.utilizator[0].procentDeGrasime),
      greutateIdeala: new FormControl(this.utilizator[0].greutateIdeala),
      necesarCaloric: new FormControl(this.utilizator[0].necesarCaloric),
      idAntrenor: new FormControl(this.utilizator[0].idAntrenor),
      imagine: new FormControl(this.utilizator[0].imagine)
    })
    console.log(this.utilizator[0].imagine);

  }
  update(user:any){
  return this.http.post(`${this.APIurl}UpdateUserData`,user);
  }
  onUpdate(){

    if (this.selectedFile == null) {

  } else {
    
      const containerName = 'alimente';
      this.azureblob.uploadFile(containerName, this.selectedFile);
      const fileUrl = this.azureblob.getFileUrl(containerName, this.selectedFile.name);
      this.updateForm.patchValue({ imagine: fileUrl });  
  }
  const formValue = this.updateForm.value;
    this.update(formValue).subscribe({
      next:(res)=>{
        this.http.get(`${this.APIurl}GetUserById?Id=${this.utilizator[0].Id}`).subscribe(data=>{
          this.newUtilizator=data;
          this.newUtilizatorJSON=this.newUtilizator[0];
          localStorage.setItem("utilizatorId",JSON.stringify([this.newUtilizatorJSON]));
        })
        
       
        
        alert("Datale au fost actualizate cu succes");
        this.updateForm.reset();
        this.refresh();
        this.onClose();
        
      },
      error:(err)=>{
        console.log(err)
        alert("Datele nu pot fi actualizate")
      }
    });
    
  }

  refresh(){
    window.location.reload();
  }

  onClose(){
    this.dialog.closeAll();
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

}
