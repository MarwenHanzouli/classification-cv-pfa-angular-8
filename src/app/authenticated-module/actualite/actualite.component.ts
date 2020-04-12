import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Offre } from 'src/app/models/Offre.model';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { Cv } from 'src/app/models/Cv.model';
import { GestionCvsService } from 'src/app/services/gestion-cvs.service';
import { User } from 'src/app/models/User.model';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { GestionCandidaturesService } from 'src/app/services/gestion-candidatures.service';
import { Candidature } from 'src/app/models/Candidature.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent implements OnInit , OnChanges{
  
  

  @Input() idOffre;
  @Input() role;
  @Input() user:User;

  faEye=faEye;
  id:number;
  roleU:string;
  userAtt:User;
  private obs:Observable<Offre>=new Observable<Offre>();
  private objStylesDetails;
  private ajourdhui:Date=new Date();
  private postul:boolean=false;
  private loadingPostule:boolean=false;
  private error:boolean=false;
  private cvSelected:boolean=false;
  private cvsObservable:Observable<Cv[]>;
  private cvs:Cv[]=[];
  private cv=null;

  constructor(private toastr: ToastrService,
              private offresService:GestionOffresService,
              private gestionCv:GestionCvsService,
              private gestionCandidature:GestionCandidaturesService) {}
                
  
  ngOnInit() {
    this.objStylesDetails={'values':[false,false,false,false]};
    if(this.roleU=='CANDIDAT')
    {
      this.cvsObservable=this.gestionCv.getAllByCandidat(this.userAtt.id);
      this.cvsObservable.subscribe(res=>this.cvs=res);
    }
  }
  ngOnChanges(changes:SimpleChanges): void {
      this.id=changes['idOffre'].currentValue;
      this.roleU=changes['role'].currentValue;
      this.userAtt=JSON.parse(changes['user'].currentValue);
      this.obs=this.offresService.getOffreById(this.id);
  }
  postulerCandidature(idOffre){
    if(this.cv==null)
    {
      this.error=true;
      return;
    }
    this.loadingPostule=true;
    let candidature:Candidature=new Candidature("",true,this.userAtt.id,this.cv.id,idOffre);
    this.gestionCandidature.addCandidature(candidature).subscribe((data)=>{
      this.toastr.success("La candidature pour cette offre a été postulée avec succès");
      this.loadingPostule=false;
    },
    (error)=>{
      this.toastr.warning(error.error.message);
      this.loadingPostule=false;
    });
    
  }
  select(value){
    this.error=false;
    this.cv=JSON.parse(value);
  }
}
