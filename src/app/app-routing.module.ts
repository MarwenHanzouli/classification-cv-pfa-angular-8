import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { OffresComponent } from './offres/offres.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { MotDePasseOublierComponent } from './components/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { AccueilCandidatComponent } from './authenticated-components/accueil-candidat/accueil-candidat.component';
import { MonCvComponent } from './candidat/mon-cv/mon-cv.component';
import { ActualitesComponent } from './authenticated-components/actualites/actualites.component';
import { MonCompteComponent } from './authenticated-components/mon-compte/mon-compte.component';
import { NotificationComponent } from './authenticated-components/notification/notification.component';
import { MesPostulesComponent } from './candidat/mes-postules/mes-postules.component';

const routes: Routes = [
  { path:'', component:AccueilComponent },
  { path:'accueil', component:AccueilComponent },
  { path:'inscription', component: InscriptionComponent},
  { path:'authentification', component: AuthentificationComponent },
  { path:'authentification/motDePasseOublier', component: MotDePasseOublierComponent },
  { path:'offres', component: OffresComponent },
  { path:'candidat', component: AccueilCandidatComponent },
  { path:'actualites', component: ActualitesComponent ,outlet: "authenticated"},
  { path:'mon-cv', component: MonCvComponent ,outlet: "authenticated"},
  { path:'mon-compte', component: MonCompteComponent ,outlet: "authenticated"},
  { path:'notifications', component: NotificationComponent ,outlet: "authenticated"},
  { path:'mes-postules', component: MesPostulesComponent ,outlet: "authenticated"},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
