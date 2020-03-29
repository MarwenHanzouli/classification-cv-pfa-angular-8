import { Component, OnInit, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash, faEye, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { Offre } from 'src/app/models/Offre.model';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit, OnDestroy{
  
  ngOnDestroy(): void {
    this.offresSubcription.unsubscribe();
  }

  faEdit=faEdit;
  faTrash=faTrash;
  faEye=faEye;
  faPlusCircle=faPlusCircle;

  private offresSubcription:Subscription;
  private offres:Offre[];

  private taille=6;
  private taillePage:number;
  private pages=[];
  private postionCourant:number=0;
  private offresCourants:Offre[];
  private offresCourantsObservable:Observable<any[]>;

  private objStyles={'values':[false,false,true,false]};
  private objStylesDeleteButtons={'values':[true,true,false,false]};

  constructor(private router: Router,
              private el: ElementRef,
              private offresService:GestionOffresService,
              private cd:ChangeDetectorRef) { 
  }

  

  ngOnInit() {
    
    this.offresSubcription=this.offresService.offresSubject.subscribe((data)=>{
      console.log("new subscription");
      this.offres=data;
      this.taillePage=Math.ceil(this.offres.length/this.taille);
      this.pages=Array(this.taillePage).fill(this.taillePage).map((x,i)=>i);
      this.offresCourants=this.offres.slice(0,this.taille);
    });
  }

  updateActive(i){
    if(i<0 || i>=this.pages.length){
      return;
    }
    this.postionCourant=i;
    let myTag = this.el.nativeElement.querySelector('#p'+i); 
    myTag.classList.add('active');
    this.pages.map((tag,indice)=>{
      if(indice!==i)
      {
        this.el.nativeElement.querySelector('#p'+indice).classList.remove('active'); 
      }
    });
    this.offresCourants=this.offres.slice(i*this.taille,i*this.taille+this.taille);
  }
  deleteOffre(id){
    let indice=0;
    while (this.offres[indice].id!==id){
      indice++;
    }
    this.offres.splice(indice,1);
    console.log(this.offres)
    this.offresService.offresSubject.next(this.offres);
  }
  naviguer(path) {
    this.router.navigate([{ outlets: {
      detailOffre: [path]
    }}]);
  }
}
