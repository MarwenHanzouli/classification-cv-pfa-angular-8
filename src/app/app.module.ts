import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { OffresComponent } from './offres/offres.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrationService } from './services/registration.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';

import { LoaderInterceptorService } from './interceptors/loader.interceptor';
import { LoaderService } from './services/loader.service';
import { WrapperComponent } from './wrapper/wrapper.component';
import { SuccesInscriptionComponent } from './succes-inscription/succes-inscription.component';
import { MotDePasseOublierComponent } from './mot-de-passe-oublier/mot-de-passe-oublier.component';
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
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    RegistrationService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
