import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffresComponent } from './offres/offres.component';
import { OffreComponent } from './offre/offre.component';
import { CandidatModule } from '../candidat-module/candidat.module';
import { AuthenticatedModule } from '../authenticated-module/authenticated.module';
import { CvsComponent } from './cvs/cvs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeOffresPipe } from '../pipes/pipe-offres.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WrapperComponent } from '../components/wrapper/wrapper.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CustomLoaderComponent } from './custom-loader/custom-loader.component';

@NgModule({
  declarations: [
    OffresComponent,
    OffreComponent,
    CvsComponent,
    PipeOffresPipe,
    LoaderComponent,
    WrapperComponent,
    CustomLoaderComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    CandidatModule,
    FontAwesomeModule,
    AuthenticatedModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  exports:[
    OffresComponent,
    OffreComponent,
    CvsComponent,
    PipeOffresPipe,
    LoaderComponent,
    WrapperComponent
  ]
})
export class OffersModule { }
