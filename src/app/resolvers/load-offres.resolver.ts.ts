import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GestionOffresService } from '../services/gestion-offres.service';
@NgModule()
@Injectable({ providedIn: 'root' })
export class LoadOffresResolver implements Resolve<any>{

    constructor(private offresService:GestionOffresService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.offresService.getAllFromServer();
    }

}
