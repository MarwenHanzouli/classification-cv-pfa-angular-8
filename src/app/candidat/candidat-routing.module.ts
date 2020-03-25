import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationsComponent } from '../authenticated-components/notifications/notifications.component';
import { ActualitesComponent } from '../authenticated-components/actualites/actualites.component';
import { MesPostulesComponent } from './mes-postules/mes-postules.component';
import { MonCvComponent } from './mon-cv/mon-cv.component';
import { MonCompteComponent } from '../authenticated-components/mon-compte/mon-compte.component';

const candidatRoutes: Routes = [
  { path:'notifications', component: NotificationsComponent ,outlet: "authenticated"},
  { path:'actualites', component: ActualitesComponent ,outlet: "authenticated"},
  { path:'mes-postules', component: MesPostulesComponent ,outlet: "authenticated"},
  { path:'mon-cv', component: MonCvComponent ,outlet: "authenticated"},
  { path:'mon-compte', component: MonCompteComponent ,outlet: "authenticated"},
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(candidatRoutes)],
    exports: [RouterModule]
  })
  export class CandidatRoutingModule { }
  