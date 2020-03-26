import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffresComponent } from './offres/offres.component';
import { OffreComponent } from './offre/offre.component';
import { ActualitesComponent } from '../authenticated-module/actualites/actualites.component';
import { NotificationsComponent } from '../authenticated-module/notifications/notifications.component';
import { CandidatModule } from '../candidat-module/candidat.module';


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
