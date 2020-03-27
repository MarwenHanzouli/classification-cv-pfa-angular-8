import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffresComponent } from './offres/offres.component';
import { OffreComponent } from './offre/offre.component';
import { CandidatModule } from '../candidat-module/candidat.module';
import { DetailsOffreComponent } from './details-offre/details-offre.component';


@NgModule({
  declarations: [
    OffresComponent,
    OffreComponent,
    DetailsOffreComponent,
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    CandidatModule
  ],
  exports:[
    DetailsOffreComponent
  ]
})
export class OffersModule { }
