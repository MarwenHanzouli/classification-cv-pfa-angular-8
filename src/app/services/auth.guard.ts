import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthentificationService,
              private router: Router,
              private toastr: ToastrService){}

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.currentUserValue)
      {
        return true;
      }
      else
      {
        this.toastr.warning("Connectez-vous pour accéder à cette ressource")
        this.router.navigate(['/authentification']);
      }
    }
  
}
