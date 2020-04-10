import { Component, OnInit } from '@angular/core';
import { GestionCvsService } from 'src/app/services/gestion-cvs.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cv } from 'src/app/models/Cv.model';

@Component({
  selector: 'app-mon-cv',
  templateUrl: './mon-cv.component.html',
  styleUrls: ['./mon-cv.component.css']
})
export class MonCvComponent implements OnInit {

  private idCandidat:number;
  private cvsSubject:BehaviorSubject<Cv[]>;
  private cvsObservable:Observable<Cv[]>;
  private cvs:Cv[];

  constructor(private gestionCv:GestionCvsService,
              private authService:AuthentificationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      (data)=>{
        if(data!==null)
        {
          console.log(data)
          if(data['user'])
          {
            this.idCandidat=data['user']['id'];
          }
          else {
            this.idCandidat=data.id;
          }
          
        }  
    },
    (er)=>{console.log(er)});
    this.gestionCv.getAllByCandidat(this.idCandidat);
    this.cvsObservable=this.gestionCv.cvsPerCandidatObservable;
	console.log(this.cvsObservable);
    // this.gestionCv.getAllByCandidat(this.idCandidat).subscribe((data)=>{
    //   this.cvs=data;
    //   this.cvsSubject=new BehaviorSubject(this.cvs);
    //   this.cvsObservable=this.cvsSubject.asObservable();
    // },
    // (err)=>{
    //   console.log(err);
    // });
  }

}
