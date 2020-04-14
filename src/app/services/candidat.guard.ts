import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class CandidatGuard implements CanActivate {

  constructor(private authService:AuthentificationService,
              private router: Router,
              private toastr: ToastrService){}
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token=this.authService.currentUserValue['token'];
      console.log(jwt_decode(token)['authorities'][0]['authority'])
      if(jwt_decode(token)['authorities'][0]['authority']==='CANDIDAT')
      {
        return true;
      }
      else {
        this.toastr.warning("Connectez-vous en tant que CANDIDAT pour accéder à cette ressource")
        this.authService.logout();
      }
  }
  
}
