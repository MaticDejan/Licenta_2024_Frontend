import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AntrenoriComponent } from './components/antrenori/antrenori.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { CereriComponent } from './components/cereri/cereri.component';
import { ExercitiiComponent } from './components/exercitii/exercitii.component';
import { AlimenteComponent } from './components/alimente/alimente.component';
import { AdminGuardService } from './services/admin-guard.service';
import { LoggedInService } from './services/logged-in.service';
import { TrainerService } from './services/trainer.service';
import { GenerateMeniuComponent } from './components/generate-meniu/generate-meniu.component';
import { AfiseazaMeniuComponent } from './components/afiseaza-meniu/afiseaza-meniu.component';
import { GenerateExercitiuComponent } from './components/generate-exercitiu/generate-exercitiu.component';
import { GenerateAntrenamentComponent } from './components/generate-antrenament/generate-antrenament.component';
import { AntrenamentComponent } from './components/antrenament/antrenament.component';
import { LoggedOutService } from './services/logged-out.service';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'',component: SignupComponent},
    {path:'AdminDashboard',component: DashboardComponent,canActivate:[AdminGuardService,LoggedInService]},
    {path:'profile/:userId',component:ProfileComponent,canActivate:[LoggedInService]},
    {path:'Antrenori',component:AntrenoriComponent,canActivate:[LoggedInService]},
    {path:'clienti',component:ClientiComponent,canActivate:[TrainerService,LoggedInService]},
    {path:'cereri',component:CereriComponent,canActivate:[LoggedInService]},
    {path:'Exercitii',component:ExercitiiComponent,canActivate:[LoggedInService]},
    {path:'Alimente',component:AlimenteComponent,canActivate:[LoggedInService]},
    {path:'GenerateMeniu',component:GenerateMeniuComponent,canActivate:[LoggedInService]},
    {path:'meniu/:meniuId',component:AfiseazaMeniuComponent,canActivate:[LoggedInService]},
    {path:'GenerateAntrenament',component:GenerateAntrenamentComponent,canActivate:[LoggedInService]},
    {path:'Antrenament/:antrenamentId',component:AntrenamentComponent,canActivate:[LoggedInService]}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
