import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatRoutingModule } from './candidat-routing.module';
import { MonCvComponent } from './mon-cv/mon-cv.component';
import { MesPostulesComponent } from './mes-postules/mes-postules.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticatedModule } from '../authenticated-module/authenticated.module';
import { LoadUserResolver } from '../resolvers/load-user.reslover';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CandidatRoutingModule,
    FontAwesomeModule,
    AuthenticatedModule,
    LoadUserResolver
  ],
  declarations: [  
    MesPostulesComponent,
    MonCvComponent
  ],
  exports:[
  ],
  providers:[]
  
})
export class CandidatModule { }
