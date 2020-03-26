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
import { LoaderComponent } from './components/loader/loader.component';

import { LoaderInterceptorService } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { SuccesInscriptionComponent } from './components/succes-inscription/succes-inscription.component';
import { MotDePasseOublierComponent } from './components/mot-de-passe-oublier/mot-de-passe-oublier.component';
import { AuthentificationService } from './services/authentification.service';

import { ErrServeurInterceptor } from './interceptors/err-serveur.interceptor';
import { CandidatModule } from './candidat-module/candidat.module';
import { OffersModule } from './offers-module/offers.module';
import { AdministrationModule } from './administration-module/administration.module';
import { NotificationService } from './services/notification.service';
import { AuthenticatedModule } from './authenticated-module/authenticated.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InscriptionComponent,
    AccueilComponent,
    AuthentificationComponent,
    FourOhFourComponent,
    FooterComponent,
    LoaderComponent,
    WrapperComponent,
    SuccesInscriptionComponent,
    MotDePasseOublierComponent
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
    CandidatModule,
    OffersModule,
    AdministrationModule,
    AuthenticatedModule
  ],
  providers: [
    RegistrationService,
    LoaderService,
    AuthentificationService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrServeurInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
