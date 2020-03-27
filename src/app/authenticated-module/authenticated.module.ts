import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { ActualitesComponent } from './actualites/actualites.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { AccueilAuthUserComponent } from './accueil-authenticated-user/accueil-auth-user.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MenuComponent } from './menu/menu.component';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    AccueilAuthUserComponent,
    NotificationsComponent,
    ActualitesComponent,
    MonCompteComponent,
    ActualiteComponent,
    FileUploadComponent,
    MenuComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AuthenticatedRoutingModule
  ],
  exports:[
    MenuComponent,
    AccueilAuthUserComponent,
    NotificationsComponent,
    ActualitesComponent,
    MonCompteComponent,
    ActualiteComponent,
    FileUploadComponent,
    ModalComponent
  ]
})
export class AuthenticatedModule { }
