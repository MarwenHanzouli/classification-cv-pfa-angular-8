import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatRoutingModule } from './candidat-routing.module';
import { AccueilCandidatComponent } from './accueil-candidat/accueil-candidat.component';
import { MonCvComponent } from './mon-cv/mon-cv.component';
import { MesPostulesComponent } from './mes-postules/mes-postules.component';
import { MenuComponent } from '../authenticated-components/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationsComponent } from '../authenticated-components/notifications/notifications.component';
import { ActualitesComponent } from '../authenticated-components/actualites/actualites.component';
import { MonCompteComponent } from '../authenticated-components/mon-compte/mon-compte.component';
import { ActualiteComponent } from '../authenticated-components/actualite/actualite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { FileUploadComponent } from '../file-upload/file-upload.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CandidatRoutingModule,
    FontAwesomeModule
  ],
  declarations: [
    MenuComponent,
    AccueilCandidatComponent,
    MesPostulesComponent,
    MonCvComponent,
    NotificationsComponent,
    ActualitesComponent,
    MonCompteComponent,
    ActualiteComponent,
    FileUploadComponent
  ],
  providers:[]
  
})
export class CandidatModule { }
