import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Offre } from 'src/app/models/Offre.model';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';

@Component({
  selector: 'app-offres-accueil',
  templateUrl: './offres-accueil.component.html',
  styleUrls: ['./offres-accueil.component.css']
})
export class OffresAccueilComponent implements OnInit {

  private offres:Observable<Offre[]>;
 

  constructor(private gestionOffres:GestionOffresService) { }

  ngOnInit() {
    this.offres=this.gestionOffres.getAllFromServer();
    // this.subscription=this.gestionOffres.getAllFromServer().subscribe((data)=>{

    // })
  }

}
