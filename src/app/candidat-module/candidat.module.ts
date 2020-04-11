import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatRoutingModule } from './candidat-routing.module';
import { MonCvComponent } from './mon-cv/mon-cv.component';
import { MesPostulesComponent } from './mes-postules/mes-postules.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticatedModule } from '../authenticated-module/authenticated.module';
import { LoadUserResolver } from '../resolvers/load-user.reslover';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CandidatRoutingModule,
    FontAwesomeModule,
    AuthenticatedModule,
    LoadUserResolver,
    PdfViewerModule
  ],
  declarations: [  
    MesPostulesComponent,
    MonCvComponent
  ],
  exports:[
    MesPostulesComponent,
    MonCvComponent
  ],
  providers:[]
  
})
export class CandidatModule { }
