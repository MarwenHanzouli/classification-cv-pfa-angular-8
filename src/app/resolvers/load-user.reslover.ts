import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthentificationService } from '../services/authentification.service';
import { map } from 'rxjs/operators';
@NgModule()
@Injectable({ providedIn: 'root' })
export class LoadUserResolver implements Resolve<any> {
  constructor(private authService: AuthentificationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.currentUserSubject.pipe(map(user=>{
      console.log(user);
       return user}));
  }
}