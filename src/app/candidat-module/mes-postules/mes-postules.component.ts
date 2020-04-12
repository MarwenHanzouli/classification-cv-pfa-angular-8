import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { Subscription, Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { GestionCandidaturesService } from 'src/app/services/gestion-candidatures.service';
import { Candidature } from 'src/app/models/Candidature.model';

@Component({
  selector: 'app-mes-postules',
  templateUrl: './mes-postules.component.html',
  styleUrls: ['./mes-postules.component.css']
})
export class MesPostulesComponent implements OnInit , OnDestroy{


  private user:User;
  private userSubscription:Subscription;
  private candidatures:Observable<Candidature[]>;
  private candidaturesTab:Candidature[]=[];
  constructor(private authService:AuthentificationService,
              private gestionCandidatures:GestionCandidaturesService) { }
  
  ngOnInit() {
    this.userSubscription=this.authService.currentUser.subscribe(
      (data)=>{
        if(data!==null)
        {
          if(data['user'])
          {
            this.user=data['user'];
          }
          else {
            this.user=data;
          }
          this.candidatures=this.gestionCandidatures.getAllCandidatureByCandidat(this.user.id);
          this.candidatures.subscribe(res=>{
            this.candidaturesTab=res;
          })
        }  
    },
    (er)=>{console.log(er)});
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
