import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffresComponent } from './offres/offres.component';
import { OffreComponent } from './offre/offre.component';


@NgModule({
  declarations: [
    OffresComponent,
    OffreComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
