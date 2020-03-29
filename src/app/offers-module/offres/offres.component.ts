import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrash, faEye, faPlusCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {

  faEdit=faEdit;
  faTrash=faTrash;
  faEye=faEye;
  faPlusCircle=faPlusCircle;
  
  constructor(private router: Router,
              private el: ElementRef) { }

  private offres=[];
  private taille=6;
  private taillePage:number;
  private pages=[];
  private postionCourant:number=0;
  private offresCourants=[];

  ngOnInit() {
    this.offres=[
      {"titre":'Développeur JAVA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'Développeur C#',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'Développeur sdfsdf',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'Développeur vxcsdf',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'Développeur bdgfv',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'Développeur zerfzer',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'Développeur JAqsdfqVA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'sqdfxcw sdc',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'qscdwxc JAVA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'vvc JAVA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'wxcvxcv JAVA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'esvd JAVA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'efs ssdf',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'sfsd sc ',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'sdf JAVsdfA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'dv JAVsdvA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'vsdv JAVA',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'sff JAVAsdfgs',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'Dévelovcxsfvcvppeur fdg',"dateOffre":"20/12/2020","entreprise":"Poulina"},
      {"titre":'sfdgfg JAVsfgsfA',"dateOffre":"20/12/2020","entreprise":"Poulina"}
    ];
    this.taillePage=Math.ceil(this.offres.length/this.taille);
    console.log(this.taillePage);
    this.pages=Array(this.taillePage).fill(this.taillePage).map((x,i)=>i);
    this.offresCourants=this.offres.slice(0,this.taille);
    console.log(this.offresCourants);
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
    console.log(this.offresCourants);
  }

  naviguer(path) {
    this.router.navigate([{ outlets: {
      detailOffre: [path]
    }}]);
  }
}
