import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  selector: 'app-adauga-aliment',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatOptionModule,HttpClientModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
  templateUrl: './adauga-aliment.component.html',
  styleUrl: './adauga-aliment.component.css'
})
export class AdaugaAlimentComponent implements OnInit {
  constructor(private http:HttpClient,private dialog: MatDialog,private router:Router,private azureblob : AzureBlobService){}
  selectedFile: File | null = null;
  ProdusForm!:FormGroup;
  private readonly APIurl  = "https://localhost:7270/api/Produs/";

  ngOnInit(): void {


      this.ProdusForm = new FormGroup({
        Id: new FormControl(''),
        Nume: new FormControl(''),
        Categorie: new FormControl(''),
        prajit: new FormControl(''),
        fiert: new FormControl(''),
        proteine: new FormControl(''),
        carbohidrati: new FormControl(''),
        grasimi: new FormControl(''),
        zahar:new FormControl(''),
        kcal: new FormControl(''),
        proteineFiert: new FormControl(''),
        carbohidratiFiert: new FormControl(''),
        grasimiFiert: new FormControl(''),
        zaharFiert:new FormControl(''),
        kcalFiert: new FormControl(''),
        proteinePrajit: new FormControl(''),
        carbohidratiPrajit: new FormControl(''),
        grasimiPrajit: new FormControl(''),
        zaharPrajit:new FormControl(''),
        kcalPrajit: new FormControl(''),
        imagine: new FormControl('')
    })

  }

  add(aliment:any){
    return this.http.post(`${this.APIurl}AdaugaProdus`,aliment);
  }

   onAdd(){
    this.ProdusForm.value.prajit=0;
    this.ProdusForm.value.fiert=0;
    this.ProdusForm.value.Id=0;
    if (this.ProdusForm.valid && this.selectedFile) {
      const formValue = this.ProdusForm.value;
      const containerName = 'alimente';

      try {
        this.azureblob.uploadFile(containerName, this.selectedFile);
        const fileUrl = this.azureblob.getFileUrl(containerName, this.selectedFile.name);
        formValue.imagine = fileUrl;
        
        this.add(formValue).subscribe({
          next: (res) => {
            alert("Aliment adăugat cu succes");
            window.location.reload();
            this.onClose(); 
          },
          error: (err) => {
            console.log(formValue);
            alert("Produsul nu a fost adăugat");
          }
        });
      } catch (error) {
        alert("Eroare la încărcarea fișierului");
      }
    } else {
      alert("Vă rugăm să adăugați o poză pentru a putea salva alimentul !");
    }
  }
  onClose(){
    this.dialog.closeAll();
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

}
