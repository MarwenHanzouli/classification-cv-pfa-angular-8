import { Component, OnInit } from '@angular/core';
import { GestionCvsService } from 'src/app/services/gestion-cvs.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { Cv } from 'src/app/models/Cv.model';

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

  constructor(private gestionCv:GestionCvsService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }
  rechercher(){
    this.rechercheSubmitted=true;
    if(this.mot==="")
    {
      this.error=true;
      return;
    }
    this.error=false;
    this.gestionCv.getAllByTag(this.mot).subscribe((data)=>{
      console.log(data);
      this.cvsR=data;
      this.cvs=of(data);
    },
    (err)=>{
      console.log(err)
      this.toastr.warning(err.error.message);
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
}
