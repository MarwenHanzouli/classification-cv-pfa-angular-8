import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Offre } from '../models/Offre.model';
@Injectable({
  providedIn: 'root'
})
export class GestionOffresService {

  offresSubject:BehaviorSubject<Offre[]>;
  offresObservable:Observable<Offre[]>;
  private offres:Offre[];
  constructor() { 
    this.offres=[
      {"id":1,"titre":'Développeur JAVA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":2,"titre":'Développeur C#',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":3,"titre":'Développeur sdfsdf',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":4,"titre":'Développeur vxcsdf',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":5,"titre":'Développeur bdgfv',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":6,"titre":'Développeur zerfzer',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":7,"titre":'Développeur JAqsdfqVA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":8,"titre":'sqdfxcw sdc',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":9,"titre":'qscdwxc JAVA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":10,"titre":'vvc JAVA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":11,"titre":'wxcvxcv JAVA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":12,"titre":'esvd JAVA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":13,"titre":'efs ssdf',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":14,"titre":'sfsd sc ',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":15,"titre":'sdf JAVsdfA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":16,"titre":'dv JAVsdvA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":17,"titre":'vsdv JAVA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":18,"titre":'sff JAVAsdfgs',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":19,"titre":'Dévelovcxsfvcvppeur fdg',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"},
      {"id":20,"titre":'sfdgfg JAVsfgsfA',"dateOffre":new Date("2020/12/20"),"entreprise":"Poulina"}
    ];
    this.offresSubject=new BehaviorSubject(this.offres);
    this.offresObservable=this.offresSubject.asObservable();
  }
}
