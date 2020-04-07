import { Component, OnInit, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Offre } from 'src/app/models/Offre.model';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit , OnChanges{
  
  

  @Input() idOffre;
  @Input() role;
  id:number;
  roleU:string;
  private obs:Observable<Offre>=new Observable<Offre>();
  private objStylesDetails;
  private ajourdhui:Date=new Date();
  

  constructor(private offresService:GestionOffresService) {}
                
  
  ngOnInit() {
    this.objStylesDetails={'values':[false,false,false,false]};
    
   
  }
  ngOnChanges(changes:SimpleChanges): void {
      this.id=changes['idOffre'].currentValue;
      this.roleU=changes['role'].currentValue;
      console.log(this.roleU)
      this.obs=this.offresService.getOffreById(this.id);
  }

}
