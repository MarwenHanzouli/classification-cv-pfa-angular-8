import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { OffresComponent } from './offers-module/offres/offres.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { MotDePasseOublierComponent } from './components/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { AccueilAuthUserComponent } from './authenticated-module/accueil-authenticated-user/accueil-auth-user.component';

const routes: Routes = [
  { path:'', component:AccueilComponent },
  { path:'accueil', component:AccueilComponent },
  { path:'inscription', component: InscriptionComponent},
  { path:'authentification', component: AuthentificationComponent },
  { path:'authentification/motDePasseOublier', component: MotDePasseOublierComponent },
  { 
    path:'offres', component: OffresComponent ,
    loadChildren:'./offers-module/offers.module#OffersModule'
  },
  // { 
  //   path:'candidat', component: AccueilAuthUserComponent ,
  //   loadChildren: './candidat-module/candidat.module#CandidatModule'
  // },
  { 
    path:'authenticated', component: AccueilAuthUserComponent ,
    loadChildren: './authenticated-module/authenticated.module#AuthenticatedModule'
  },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
