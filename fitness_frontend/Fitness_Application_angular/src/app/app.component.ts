import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileMyInfoComponent } from './components/profile-my-info/profile-my-info.component';
import { ProfileAntrenamentComponent } from './components/profile-antrenament/profile-antrenament.component';
import { ProfileMancareComponent } from './components/profile-mancare/profile-mancare.component';
import { AlimenteComponent } from './components/alimente/alimente.component';
import { ExercitiiComponent } from './components/exercitii/exercitii.component';
import { CereriComponent } from './components/cereri/cereri.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { AntrenoriComponent } from './components/antrenori/antrenori.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AdaugaAlimentComponent } from './components/adauga-aliment/adauga-aliment.component';
import { GenerateMeniuComponent } from './components/generate-meniu/generate-meniu.component';
import { AfiseazaMeniuComponent } from './components/afiseaza-meniu/afiseaza-meniu.component';
import { CreazaCereriComponent } from './components/creaza-cereri/creaza-cereri.component';
import { GenerateAntrenamentComponent } from './components/generate-antrenament/generate-antrenament.component';
import { GenerateExercitiuComponent } from './components/generate-exercitiu/generate-exercitiu.component';
import { AntrenamentComponent } from './components/antrenament/antrenament.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HttpClientModule,RouterOutlet,
       CommonModule, LoginComponent,
        SignupComponent,ReactiveFormsModule,
        DashboardComponent,ProfileMyInfoComponent,
      ProfileAntrenamentComponent,ProfileMancareComponent,
      AlimenteComponent,ExercitiiComponent,CereriComponent,ClientiComponent,AntrenoriComponent,
      NavbarComponent,RouterModule,RouterLink,MatToolbarModule,MatButtonModule,
      AdaugaAlimentComponent,GenerateMeniuComponent,AfiseazaMeniuComponent,
      CreazaCereriComponent,GenerateAntrenamentComponent,GenerateExercitiuComponent,AntrenamentComponent
    ]
})
export class AppComponent {

  title = 'Fitness_Application_angular';

  constructor(private http: HttpClient) {
  }
  ngOnInit(){
  }
}
