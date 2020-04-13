import { Component, OnInit } from '@angular/core';
import { GestionCvsService } from 'src/app/services/gestion-cvs.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Cv } from 'src/app/models/Cv.model';
import { GestionUsersService } from 'src/app/services/gestion-users.service';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CvsComponent implements OnInit {

  private error:boolean=false;
  private rechercheSubmitted:boolean=false;
  private mot:string="";
  private cvs:Observable<Cv[]>;
  private cvsR:Cv[];
  private loading:boolean=false;
  private initial:boolean;
  private result:boolean;
  private objStylesDetails;
  constructor(private gestionCv:GestionCvsService,
              private toastr: ToastrService,
              private gestionUser:GestionUsersService) { }

  ngOnInit() {
    this.initial=true;
    this.result=false;
    this.objStylesDetails={'values':[false,false,false,true,true]};
  }
  rechercher(){
    this.initial=true;
    this.result=false;
    this.rechercheSubmitted=true;
    if(this.mot==="")
    {
      this.error=true;
      return;
    }
    this.loading=true;
    this.error=false;
    this.gestionCv.getAllByTag(this.mot).subscribe((data)=>{
      this.loading=false;
      this.initial=false;
      this.result=true;
      console.log(data);
      this.cvsR=data;
      this.cvs=of(data);
      
      if(data.length==0)
      {
        this.toastr.warning("Aucun CV a répondu à cette demande");
      }
    },
    (err)=>{
      console.log(err)
      this.toastr.warning(err.error.message);
      this.loading=false;
    });
  }
  showFile(id){
    let i=0;
    while(i<this.cvsR.length && this.cvsR[i].id!==id)
    {
      i++;
    }
    if(i>=this.cvsR.length)
    {
      return;
    }
    return 'data:'+this.cvsR[i].fichier.type+';base64,'+this.cvsR[i].fichier.encoded;
  }
  showFile2(id){
    let i=0;
    while(i<this.cvsR.length && this.cvsR[i].id!==id)
    {
      i++;
    }
    if(i>=this.cvsR.length)
    {
      return;
    }
    return 'data:'+this.cvsR[i].fichier.type+';base64,'+this.cvsR[i].fichier.encoded;
  }
  getCandidatById(id)
  {
	console.log("jjjj")
    return this.gestionUser.getCandidatById(id);
  }
  voirCv(cv){
    console.log(cv)
  }
}
