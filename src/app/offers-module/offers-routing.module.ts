import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffreComponent } from './offre/offre.component';
import { OffresComponent } from './offres/offres.component';

const offersRoutes: Routes = [
    { path:'', component: OffreComponent },
    { path:'offre', component: OffreComponent , outlet:'detailOffre'},
    { path:'detail-offre', component: OffresComponent , outlet:'detailOffre'}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(offersRoutes)],
    exports: [RouterModule]
  })
  export class OffersRoutingModule { }
  