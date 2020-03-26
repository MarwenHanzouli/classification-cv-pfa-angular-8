import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffreComponent } from './offre/offre.component';
import { MonCompteComponent } from '../authenticated-components/mon-compte/mon-compte.component';

const offersRoutes: Routes = [
    { path:'', component: OffreComponent },
    { path:'offre', component: OffreComponent , outlet:'detailOffre'},
    { path:'detail-offre', component: MonCompteComponent , outlet:'detailOffre'}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(offersRoutes)],
    exports: [RouterModule]
  })
  export class OffersRoutingModule { }
  