import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { Offre } from 'src/app/models/Offre.model';
import { Observable } from 'rxjs';
import { faCalendarAlt, faMapMarkedAlt, faStoreAlt, faGraduationCap, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-details-offre',
  templateUrl: './details-offre.component.html',
  styleUrls: ['./details-offre.component.css']
})
export class DetailsOffreComponent implements OnInit , OnChanges{
  

  @Input() idOffre;
  id:number;
  private obs:Observable<Offre>=new Observable<Offre>();

  faCalendarAlt=faCalendarAlt;
  faMapMarkedAlt=faMapMarkedAlt;
  faStoreAlt=faStoreAlt;
  faGraduationCap=faGraduationCap;
  faChalkboardTeacher=faChalkboardTeacher;

  constructor(private offresService:GestionOffresService) { }

  ngOnInit() {
    
    
  }
  ngOnChanges(changes:SimpleChanges): void {
      this.id=changes['idOffre'].currentValue;
      this.obs=this.offresService.getOffreById(this.id);
  }
}
