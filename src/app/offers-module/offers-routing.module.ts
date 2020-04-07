import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffreComponent } from './offre/offre.component';
import { OffresComponent } from './offres/offres.component';
import { NotificationsComponent } from '../authenticated-module/notifications/notifications.component';
import { ActualitesComponent } from '../authenticated-module/actualites/actualites.component';
import { MonCompteComponent } from '../authenticated-module/mon-compte/mon-compte.component';
import { CvsComponent } from './cvs/cvs.component';
import { LoadOffresResolver } from '../resolvers/load-offres.resolver.ts';

const offersRoutes: Routes = [
    { path:'', component: OffreComponent },
    { path:'notifications', component: NotificationsComponent ,outlet: "authenticated"},
    { path:'actualites', component: ActualitesComponent ,outlet: "authenticated", resolve: {  offress: LoadOffresResolver }},
    { path:'mon-compte', component: MonCompteComponent ,outlet: "authenticated"},
    { path:'cvs', component: CvsComponent ,outlet: "authenticated"},
    { path:'offres', component: OffresComponent ,outlet: "authenticated",resolve: {  offress: LoadOffresResolver }},
    { path:'offre', component: OffreComponent , outlet:'detailOffre'},
    { path:'detail-offre', component: OffresComponent , outlet:'detailOffre'}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(offersRoutes)],
    exports: [RouterModule]
  })
  export class OffersRoutingModule { }
  