import { Component, OnInit, Input } from '@angular/core';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { Offre } from 'src/app/models/Offre.model';

@Component({
  selector: 'app-details-offre',
  templateUrl: './details-offre.component.html',
  styleUrls: ['./details-offre.component.css']
})
export class DetailsOffreComponent implements OnInit {

  @Input() idOffre;
  private offre:Offre;
  constructor(private offresService:GestionOffresService) { }

  ngOnInit() {
    this.offresService.getOffreById(this.idOffre).subscribe(offre=>{
      this.offre=offre;
    })
  }

}
