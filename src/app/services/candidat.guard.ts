import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { GestionUsersService } from './gestion-users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CandidatGuard implements CanActivate {

  constructor(private authService:AuthentificationService,
              private router: Router,
              private toastr: ToastrService,
              private gestionUsersService: GestionUsersService ){}
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user=this.authService.currentUserValue['user'];
      if(user['role']==='CANDIDAT')
      {
        this.gestionUsersService.getCandidatById(user['id']).subscribe((data)=>{
          if(data)
          {
            
          }
        });
        return true;
      }
      else {
        this.toastr.warning("Connectez-vous en tant que CANDIDAT pour accéder à cette ressource")
        this.authService.logout();
      }
  }
  
}
