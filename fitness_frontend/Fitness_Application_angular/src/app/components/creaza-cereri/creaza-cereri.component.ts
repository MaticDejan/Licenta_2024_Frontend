import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creaza-cereri',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatOptionModule,HttpClientModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
  templateUrl: './creaza-cereri.component.html',
  styleUrl: './creaza-cereri.component.css'
})
export class CreazaCereriComponent implements OnInit{
  cerereForm!:FormGroup;
  private readonly apiUrlCereri="https://localhost:7270/api/Cereri/";
  user:any=[];
  JSONUser:any=[];

  constructor(private http:HttpClient,private router:Router,private dialog: MatDialog){}

  ngOnInit(): void {

  this.JSONUser=localStorage.getItem("utilizatorId");
  this.user=JSON.parse(this.JSONUser);

  this.cerereForm=new FormGroup({
  Id: new FormControl(''),
  categorie: new FormControl(''),
  descriere:new FormControl(''),
  status:new FormControl(''),
  idUtilizatorCerere:new FormControl(''),
  idUtilizatorRaportat: new FormControl(''),
  raspuns:new FormControl('')
})

  }

  creazaCererea(cerere:any){
    return this.http.post(`${this.apiUrlCereri}CreareCerere`,cerere);
  }

  onCreareCerere(){
    this.cerereForm.value.raspuns=" ";
    this.cerereForm.value.idUtilizatorRaportat=0;
    this.cerereForm.value.Id=0;
    this.cerereForm.value.status="In asteptare";
    this.cerereForm.value.idUtilizatorCerere=this.user[0].Id;
    this.creazaCererea(this.cerereForm.value).subscribe(rez=>{
      alert("Cererea a fost trimisă cu succes. Vă mulțumim!");
      window.location.reload();
      this.onClose();
    });
  }

  onClose(){
    this.dialog.closeAll();
  }



}
