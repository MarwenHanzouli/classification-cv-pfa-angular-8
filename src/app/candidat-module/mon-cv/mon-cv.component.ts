import { Component, OnInit } from '@angular/core';
import { GestionCvsService } from 'src/app/services/gestion-cvs.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cv } from 'src/app/models/Cv.model';
import { faTrash,faEye} from '@fortawesome/free-solid-svg-icons';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-mon-cv',
  templateUrl: './mon-cv.component.html',
  styleUrls: ['./mon-cv.component.css']
})
export class MonCvComponent implements OnInit {

  faTrash=faTrash;
  faEye=faEye;
  private idCandidat:number;
  private cvsObservable:Observable<Cv[]>;
  private cvs:Cv[];
  private objStylesDelete;
  private objStylesDetails;
  
  constructor(private gestionCv:GestionCvsService,
              private authService:AuthentificationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.objStylesDelete={'values':[true,true,false,false]};
    this.objStylesDetails={'values':[false,false,false,true,true]};
    this.authService.currentUser.subscribe(
      (data)=>{
        if(data!==null)
        {
          if(data['user'])
          {
            this.idCandidat=data['user']['id'];
          }
          else {
            this.idCandidat=data.id;
          }
          this.gestionCv.emitNewCvs([]);
          this.gestionCv.getAllByCandidat(this.idCandidat).subscribe((data)=>{
            this.cvs=data;
            data.forEach(element => {
              this.gestionCv.emitNewCv(element);
            });
          });
          this.cvsObservable=this.gestionCv.cvsPerCandidatObservable;
        }  
    },
    (er)=>{console.log(er)});
  }
  deleteCv(id){
    this.gestionCv.deleteCv(id,this.idCandidat).subscribe(()=>{
      this.cvsObservable=this.gestionCv.getAllByCandidat(this.idCandidat);
      this.cvsObservable.subscribe(res=>this.cvs=res);
    });
  }
  showFile(id){
    let i=0;
    while(i<this.cvs.length && this.cvs[i].id!==id)
    {
      i++;
    }
    if(i>=this.cvs.length)
    {
      return;
    }
    return 'data:'+this.cvs[i].fichier.type+';base64,'+this.cvs[i].fichier.encoded;
  }

}
