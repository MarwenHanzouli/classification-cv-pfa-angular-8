import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { AccueilComponent } from './components/accueil/accueil.component';

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

import { LoaderInterceptorService } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { SuccesInscriptionComponent } from './components/succes-inscription/succes-inscription.component';
import { MotDePasseOublierComponent } from './components/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { AuthentificationService } from './services/authentification.service';

import { ErrServeurInterceptor } from './interceptors/err-serveur.interceptor';
import { OffersModule } from './offers-module/offers.module';
import { NotificationService } from './services/notification.service';
import { GestionUsersService } from './services/gestion-users.service';
import { LoadUserResolver } from './resolvers/load-user.reslover';
import { LoadOffresResolver } from './resolvers/load-offres.resolver.ts';
import { GestionCandidaturesService } from './services/gestion-candidatures.service';
import { GestionCvsService } from './services/gestion-cvs.service';
import { OffresAccueilComponent } from './components/offres-accueil/offres-accueil.component';
import { AuthenticatedModule } from './authenticated-module/authenticated.module';
import { AuthGuard } from './services/auth.guard';
import { CandidatGuard } from './services/candidat.guard';
import { ManagerGuard } from './services/manager.guard';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InscriptionComponent,
    AccueilComponent,
    AuthentificationComponent,
    FourOhFourComponent,
    FooterComponent,
    SuccesInscriptionComponent,
    MotDePasseOublierComponent,
    OffresAccueilComponent
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
    OffersModule,
    LoadUserResolver,
    LoadOffresResolver,
    AuthenticatedModule
  ],
  providers: [
    RegistrationService,
    LoaderService,
    AuthentificationService,
    NotificationService,
    GestionUsersService,
    GestionCandidaturesService,
    GestionCvsService,
    AuthGuard,
    CandidatGuard,
    ManagerGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrServeurInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
