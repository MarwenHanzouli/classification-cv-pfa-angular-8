import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { ToastrService } from 'ngx-toastr';
import { GestionUsersService } from './gestion-users.service';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private authService:AuthentificationService,
    private router: Router,
    private toastr: ToastrService,
    private gestionUsersService: GestionUsersService ){}

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token=this.authService.currentUserValue['token'];
      console.log(jwt_decode(token)['authorities'][0]['authority'])
      if(jwt_decode(token)['authorities'][0]['authority']==='MANAGER')
      {
        return true;
      }
      else
      {
        this.toastr.warning("Connectez-vous en tant que MANAGER pour accéder à cette ressource")
        this.authService.logout();
      }
    }
  
}
