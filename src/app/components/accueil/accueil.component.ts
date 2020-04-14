import { Component, OnInit, OnDestroy } from '@angular/core';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, OnDestroy {


  private nbrOffres:number;
  private subscription:Subscription;
  
  constructor(private gestionOffres:GestionOffresService) { } 
  
  ngOnInit() {
    this.subscription=this.gestionOffres.getAllFromServer().subscribe((data)=>{
      this.nbrOffres=data.length;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
