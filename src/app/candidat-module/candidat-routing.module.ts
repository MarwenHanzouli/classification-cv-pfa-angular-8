import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonCvComponent } from './mon-cv/mon-cv.component';
import { MesPostulesComponent } from './mes-postules/mes-postules.component';
import { NotificationsComponent } from '../authenticated-module/notifications/notifications.component';
import { ActualitesComponent } from '../authenticated-module/actualites/actualites.component';
import { MonCompteComponent } from '../authenticated-module/mon-compte/mon-compte.component';
import { LoadUserResolver } from '../resolvers/load-user.reslover';
import { LoadOffresResolver } from '../resolvers/load-offres.resolver.ts';

const candidatRoutes: Routes = [
  { path:'notifications', component: NotificationsComponent ,outlet: "authenticated"},
  { path:'actualites', component: ActualitesComponent ,outlet: "authenticated", resolve: {  offress: LoadOffresResolver }},
  { path:'mes-postules', component: MesPostulesComponent ,outlet: "authenticated"},
  { path:'mon-cv', component: MonCvComponent ,outlet: "authenticated"},
  { path:'mon-compte', component: MonCompteComponent ,outlet: "authenticated"},
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(candidatRoutes)],
    exports: [RouterModule]
  })
  export class CandidatRoutingModule { }
  