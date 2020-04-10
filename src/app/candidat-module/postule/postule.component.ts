import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/helpers/validators';
import { GestionCvsService } from 'src/app/services/gestion-cvs.service';
import { Cv } from 'src/app/models/Cv.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-postule',
  templateUrl: './postule.component.html',
  styleUrls: ['./postule.component.css']
})
export class PostuleComponent implements OnInit {

  private form:FormGroup;
  private urlImg:any;
  private cvSubmitted:boolean=false;
  private loadingFile:boolean=false;
  private idCandidat:number;
  private loadingValue:number=0;
  
  constructor(private formBuilder: FormBuilder,
              private gestionCv:GestionCvsService,
              private authService:AuthentificationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
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
  }
  initForm(){
    //.pdf,.jpg,.png,.jpeg,.bmp,.gif,.tif,.tiff,.webp"
    this.form=this.formBuilder.group({
      file: [null, [Validators.required, requiredFileType(['png','jpg','pdf','jpeg','bmp','gif','tif','tiff','webp'])]]
    });
  }
  get f() { return this.form.controls; }
  getFile(fileData:any){
    this.urlImg=fileData;
    //this.photoSubmitted=false;
  }

  postulerCv(){
    this.loadingValue=0;
    this.cvSubmitted=true;
    if(this.form.invalid)
    {
      return;
    }
    this.loadingFile=true;
    let cv:Cv=new Cv(null,null,true,this.idCandidat);
    let sub:Subscription=interval(750).subscribe(x => {
      // something
      this.loadingValue+=5;
    });
    this.gestionCv.addCv(cv,this.form.value['file']).subscribe((data)=>{
      console.log(data);
      this.toastr.success("Ce CV a été ajouté avec succès");
      this.loadingValue=100;
      this.loadingFile=false;
      this.gestionCv.emitNewCv(data);
      sub.unsubscribe();
    },
    (error)=>{
      console.log(error);
      this.toastr.warning(error.error['message']);
      this.loadingFile=false;
      this.loadingValue=0;
      sub.unsubscribe();
    });

  }
  annuler(){
    this.loadingFile=false;
  }
}
