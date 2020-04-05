import { Component, OnInit } from '@angular/core';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { Organisme } from 'src/app/models/Organisme.model';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {


  organismeForm:FormGroup;
  private orgSubscription:Subscription;
  private organismes:Observable<Organisme[]>;
  private organisme:Observable<Organisme>=new Observable<Organisme>();
  private os:Organisme[];
  private clickedO:boolean=false;
  private formOrganismeSubmitted:boolean=false;
  private loadingO:boolean=false;

  constructor(private offresService:GestionOffresService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.initFormOrganisme();
  }
  /*******************form organimse */
  initFormOrganisme()
  {
    this.orgSubscription=this.offresService.getAllOrganisme().subscribe((data)=>{
      this.organismes=of(data);
      this.os=data;
      this.organismeForm=this.formBuilder.group({
        organisme:['',[Validators.required, Validators.minLength(2)]],
        secteur:['',[Validators.required, Validators.minLength(3)]]
      });
    });  
  }
  onChangeOrganimse(value){
    if(value!=='c')
    {
      this.organisme=of(JSON.parse(value));
    }
    else{
      this.organisme=of()
    }
  }
  get fO() { return this.organismeForm.controls; }
  submitOrganisme(){
    this.formOrganismeSubmitted=true;
    this.loadingO=true;
    if(this.organismeForm.invalid)
    {
      return;
    }
    let o:Organisme=new Organisme(this.organismeForm.value['organisme'],this.organismeForm.value['secteur']);
    this.organisme=of(o);
    this.offresService.addOrganisme(o).subscribe((rep)=>{
      this.loadingO=false;
      this.toastr.success("Cet organisme a été ajouté avec succès!");
      this.os.push(o);
      this.organismes=of(this.os);
    },
    (error)=>{
      this.loadingO=false;
      this.toastr.warning(error.error.message);
    });
  }
}
