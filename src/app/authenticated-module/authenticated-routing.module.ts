import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsComponent } from './notifications/notifications.component';
import { ActualitesComponent } from './actualites/actualites.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';

const authenticatedRoutes: Routes = [
//   { path:'notifications', component: NotificationsComponent ,outlet: "authenticated"},
//   { path:'actualites', component: ActualitesComponent ,outlet: "authenticated"},
//   { path:'mon-compte', component: MonCompteComponent ,outlet: "authenticated"},
  { path:'candidat',loadChildren: '../candidat-module/candidat.module#CandidatModule'},
  { path:'candidat',loadChildren: '../candidat-module/candidat.module#CandidatModule'}
];
  
  @NgModule({
    imports: [RouterModule.forChild(authenticatedRoutes)],
    exports: [RouterModule]
  })
  export class AuthenticatedRoutingModule { }
  