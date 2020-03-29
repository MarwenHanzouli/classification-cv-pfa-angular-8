import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffresComponent } from './offres/offres.component';
import { OffreComponent } from './offre/offre.component';
import { CandidatModule } from '../candidat-module/candidat.module';
import { DetailsOffreComponent } from './details-offre/details-offre.component';
import { AuthenticatedModule } from '../authenticated-module/authenticated.module';
import { CvsComponent } from './cvs/cvs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    OffresComponent,
    OffreComponent,
    DetailsOffreComponent,
    CvsComponent,
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    CandidatModule,
    FontAwesomeModule,
    AuthenticatedModule
  ],
  exports:[
    DetailsOffreComponent
  ]
})
export class OffersModule { }
