import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatGuard } from '../services/candidat.guard';
import { ManagerGuard } from '../services/manager.guard';

const authenticatedRoutes: Routes = [
//   { path:'notifications', component: NotificationsComponent ,outlet: "authenticated"},
//   { path:'actualites', component: ActualitesComponent ,outlet: "authenticated"},
//   { path:'mon-compte', component: MonCompteComponent ,outlet: "authenticated"},
  { path:'candidat', canActivate: [CandidatGuard], loadChildren: '../candidat-module/candidat.module#CandidatModule'},
  { path:'manager', canActivate: [ManagerGuard], loadChildren: '../offers-module/offers.module#OffersModule'}
];
  
  @NgModule({
    imports: [RouterModule.forChild(authenticatedRoutes)],
    exports: [RouterModule]
  })
  export class AuthenticatedRoutingModule { }
  