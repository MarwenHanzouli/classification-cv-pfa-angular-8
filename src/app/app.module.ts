import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { OffresComponent } from './offres/offres.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrationService } from './services/registration.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './components/loader/loader.component';

import { LoaderInterceptorService } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { SuccesInscriptionComponent } from './components/succes-inscription/succes-inscription.component';
import { MotDePasseOublierComponent } from './components/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { AuthentificationService } from './services/authentification.service';
import { MenuComponent } from './authenticated-components/menu/menu.component';
import { AccueilCandidatComponent } from './authenticated-components/accueil-candidat/accueil-candidat.component';

import { ErrServeurInterceptor } from './interceptors/err-serveur.interceptor';
import { MonCvComponent } from './candidat/mon-cv/mon-cv.component';
import { ActualitesComponent } from './authenticated-components/actualites/actualites.component';
import { MonCompteComponent } from './authenticated-components/mon-compte/mon-compte.component';
import { NotificationComponent } from './authenticated-components/notification/notification.component';
import { MesPostulesComponent } from './candidat/mes-postules/mes-postules.component';
import { CandidatModule } from './candidat/candidat.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InscriptionComponent,
    AccueilComponent,
    OffresComponent,
    AuthentificationComponent,
    FourOhFourComponent,
    FooterComponent,
    LoaderComponent,
    WrapperComponent,
    SuccesInscriptionComponent,
    MotDePasseOublierComponent,
    MenuComponent,
    AccueilCandidatComponent,
    MonCvComponent,
    ActualitesComponent,
    MonCompteComponent,
    NotificationComponent,
    MesPostulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    CandidatModule
  ],
  providers: [
    RegistrationService,
    LoaderService,
    AuthentificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrServeurInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
