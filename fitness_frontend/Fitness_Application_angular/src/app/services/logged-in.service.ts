import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  idJSON:any=[];
  id:any=[];
  constructor(private router: Router) { }

  isLoggedIn(){
    this.idJSON=localStorage.getItem("utilizatorId");
    this.id=JSON.parse(this.idJSON);
    
    if(this.id[0].Id > 0){
      return true;
    }
    return false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.isLoggedIn())
      {
        return true;
      }
      else{
        return false;
      }
  }
}
