import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { OffresComponent } from './offres/offres.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';


const routes: Routes = [
  { path:'', component:AccueilComponent },
  { path:'accueil', component:AccueilComponent },
  {path: 'inscription', component: InscriptionComponent},
  { path:'authentification', component: AuthentificationComponent },
  { path:'offres', component: OffresComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
