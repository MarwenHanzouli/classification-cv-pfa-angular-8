import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffresComponent } from './offres/offres.component';
import { OffreComponent } from './offre/offre.component';
import { ActualitesComponent } from '../authenticated-components/actualites/actualites.component';
import { NotificationsComponent } from '../authenticated-components/notifications/notifications.component';
import { CandidatModule } from '../candidat/candidat.module';


@NgModule({
  declarations: [
    OffresComponent,
    OffreComponent,
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    CandidatModule
  ]
})
export class OffersModule { }
