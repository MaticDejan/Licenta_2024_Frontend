import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  idJSON:any=[];
  id:any=[];
  constructor(private router: Router) { }
  isTrainer(){
    this.idJSON=localStorage.getItem("utilizatorId");
    this.id=JSON.parse(this.idJSON);
    if(this.id[0].Antrenor){
      return true;
    }
    return false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.isTrainer())
      {
        return true;
      }
      else{
        return false;
      }
  }
}
