import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { OffresComponent } from './offres/offres.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { MotDePasseOublierComponent } from './mot-de-passe-oublier/mot-de-passe-oublier.component';
import { AccueilCandidatComponent } from './accueil-candidat/accueil-candidat.component';


const routes: Routes = [
  { path:'', component:AccueilComponent },
  { path:'accueil', component:AccueilComponent },
  {path: 'inscription', component: InscriptionComponent},
  { path:'authentification', component: AuthentificationComponent },
  { path:'authentification/motDePasseOublier', component: MotDePasseOublierComponent },
  { path:'offres', component: OffresComponent },
  { path:'candidat', component: AccueilCandidatComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
