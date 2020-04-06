import { Component, OnInit, ElementRef, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faEdit, faTrash, faEye, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subscription, Observable, from, Scheduler, asyncScheduler, of } from 'rxjs';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { Offre } from 'src/app/models/Offre.model';
import { first, skip } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffresComponent implements OnInit, OnDestroy, DoCheck{

  faEdit=faEdit;
  faTrash=faTrash;
  faEye=faEye;
  faPlusCircle=faPlusCircle;

  private offresSubcription:Subscription;
  private offres:Offre[]=[];

  private taille;
  private taillePage:number;
  private pages=[];
  private postionCourant:number=0;
  private offresCourants:Offre[];
  private offresCourantsObservable=new Observable<Offre[]>();

  private objStyles;
  private objStylesDelete;
  private objStylesModifer;
  private objStylesDetails;

  constructor(private router: Router,
              private el: ElementRef,
              private offresService:GestionOffresService,
              private cd:ChangeDetectorRef,
              private route: ActivatedRoute,
              private toastr: ToastrService) { 
  }

  

  ngOnInit() {
    this.objStyles={'values':[false,false,true,false]};
    this.taille=6;
    //this.offresService.getAll();
    //this.offresCourantsObservable=this.offresService.offresObservable
    this.offresSubcription=this.offresService.offresSubject.pipe(first()).subscribe((data)=>{
      console.log("first subscription");
      this.objStylesDelete={'values':[true,true,false,false]};
      this.objStylesModifer={'values':[false,false,false,false]};
      this.objStylesDetails={'values':[false,false,false,false]};
      this.offres=data;
      this.taillePage=Math.ceil(this.offres.length/this.taille);
      this.pages=Array(this.taillePage).fill(this.taillePage).map((x,i)=>i);
      this.offresCourants=this.offres.slice(0,this.taille);
      this.offresCourantsObservable=of(this.offresCourants);
    });
    this.offresService.offresSubject.pipe(skip(1)).subscribe(
      (data)=>{
        console.log("thisssssss")
      }
    );
  }

  updateActive(i){
    if(i<0 || i>=this.pages.length && i!==0){
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
    this.offresCourantsObservable=of(this.offresCourants);
    this.offresSubcription.unsubscribe();
  }
  deleteOffre(id){
     this.offresService.deleteOffre(id).subscribe((response)=>{
       console.log(response);
       if(response==null)
       {
          this.toastr.success("Cette offre a été supprimée avec succès!");
       }
      
     },
     (error)=>{
       this.toastr.warning(error.message);
     });
     let indice=0;
     while (this.offres[indice].id!==id){
       indice++;
     }
     this.offres.splice(indice,1);
     this.offresService.offresSubject.next(this.offres);
     this.objStylesDelete={'values':[true,true,false,false]};
     this.objStylesModifer={'values':[false,false,false,false]};
     this.objStylesDetails={'values':[false,false,false,false]};
     this.taillePage=Math.ceil(this.offres.length/this.taille);
     this.pages=Array(this.taillePage).fill(this.taillePage).map((x,i)=>i);
     if(indice%this.taille==0 && this.offres[indice])
     {
       this.updateActive(this.postionCourant);
     }
     else if(indice%this.taille==0 && !this.offres[indice] && this.offres.length!==0)
     {
       this.updateActive(this.postionCourant-1);
     }
     else if(indice%this.taille==0 && !this.offres[indice] && this.offres.length==0)
     {
       this.updateActive(this.postionCourant);
     }
     else
     {
       let newPageActive=Math.ceil((indice)/this.taille);
       this.updateActive(newPageActive-1);
     }
    
  }
  modifierOffre(id){

  }

  updateObservableCourants(){

  }
  naviguer(path) {
    this.router.navigate([{ outlets: {
      detailOffre: [path]
    }}]);
  }



  ngDoCheck(): void {

  }
  
  ngOnDestroy(): void {
    this.offresSubcription.unsubscribe();
  }

}
