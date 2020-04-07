import { Component, OnInit, OnDestroy } from '@angular/core';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { Subscription, Observable, of } from 'rxjs';
import { Offre } from 'src/app/models/Offre.model';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit , OnDestroy{

  private offresSubcription:Subscription;
  private offres:Observable<Offre[]>;
  private user:Observable<any>;
  private userSubscription:Subscription;

  constructor(private offresService:GestionOffresService,
              private authService:AuthentificationService) { }

  ngOnInit() {
    // this.offres=this.offresService.getAllFromServer();
    this.offresSubcription=this.offresService.offresSubject.subscribe((data)=>{
      data.sort((a,b)=> Date.parse(a.createdDate)<=Date.parse(b.createdDate) ? 1 :-1);
      console.log(data)
      this.offres=of(data);
    });
    this.userSubscription=this.authService.currentUser.subscribe(
      (data)=>{
        if(data!==null)
        {
          console.log(data)
          if(data['user'])
          {
            this.user=of(data['user']);
            console.log(this.user)
          }
          else {
            this.user=of(data);
            console.log(this.user)
          }
          
        }  
    },
    (er)=>{console.log(er)});
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.offresSubcription.unsubscribe();
  }
}
