import { Component, OnInit, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
import { GestionOffresService } from 'src/app/services/gestion-offres.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { Organisme } from 'src/app/models/Organisme.model';
import { Offre } from 'src/app/models/Offre.model';
import { MustMoreThan } from 'src/app/helpers/validators';
import { Competence } from 'src/app/models/Competence.model';
import { TypeOffre } from 'src/app/models/enums/type-offre.enum';
import { Niveau } from 'src/app/models/enums/niveau.enum';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit , OnDestroy{

  //private pageCourant:number=0;
  private idManager:number;

  organismeForm:FormGroup;
  private orgSubscription:Subscription;
  private organismes:Observable<Organisme[]>;
  private organisme:Observable<Organisme>=new Observable<Organisme>();
  private os:Organisme[];
  private clickedO:boolean;
  private formOrganismeSubmitted:boolean;
  private loadingOrganisme:boolean;
  private organismeSelected:boolean=false;


  private offreForm:FormGroup;
  private offre:Offre;
  private submittedOffre:boolean;
  private types:Observable<string[]>=new Observable<string[]>();
  private niveaux:Observable<string[]>=new Observable<string[]>();
  private typesSubscription:Subscription;
  private niveausSubscription:Subscription;
  private competences:Observable<Competence[]>=new Observable<Competence[]>();
  private competencesSubscription:Subscription;
  private comps:Competence[];
  private competencesSelected:Observable<Competence[]>=new Observable<Competence[]>();
  private compsSelected:Competence[]=[];
  private newComp:string="";
  private loadingOf:boolean=false;

  private offreSaved:boolean;
  constructor(private offresService:GestionOffresService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private authService:AuthentificationService) { }
  
  ngOnInit() {
    this.loadingOrganisme=false;
    this.offreSaved=false;
    this.submittedOffre=false;
    this.clickedO=false;
    this.formOrganismeSubmitted=false;
    this.loadingOf=false;
    this.authService.currentUser.subscribe(
      (user)=>{
        if(user)
        {
          if(this.idManager=user['user'])
          this.idManager=user['user'].id;
        }
        
    },
    (er)=>{console.log(er)});
    
    this.initFormOrganisme();
    this.initFormOffre();
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
      //this.pageCourant++;
      this.organismeSelected=true;
    }
    else{
      this.organisme=of()
    }
  }
  get fO() { return this.organismeForm.controls; }
  submitOrganisme(){
    this.formOrganismeSubmitted=true;
    if(this.organismeForm.invalid)
    {
      return;
    }
    this.loadingOrganisme=true;
    let o:Organisme=new Organisme(this.organismeForm.value['organisme'],this.organismeForm.value['secteur']);
    this.organisme=of(o);
    this.orgSubscription=this.offresService.addOrganisme(o).subscribe((rep)=>{
      this.loadingOrganisme=false;
      console.log(this.loadingOrganisme)
      this.toastr.success("Cet organisme a été ajouté avec succès!");
      this.os.push(o);
      this.organismes=of(this.os);
      //this.pageCourant++;
      this.organismeSelected=true;
    },
    (error)=>{
      this.loadingOrganisme=false;
      this.toastr.warning(error.error.message);
    });
  }
  passer(i){
    
  }
  /****************************form offre */
  initFormOffre()
  {
    this.niveausSubscription=this.offresService.getAllNiveau().subscribe((data)=>{
      this.niveaux=of(data);
    });
    this.typesSubscription=this.offresService.getAllType().subscribe((data)=>{
      this.types=of(data);
    });
    this.competencesSubscription=this.offresService.getAllCompetences().subscribe((data)=>{
      this.competences=of(data);
      this.comps=data;
    });
    this.offreForm=this.formBuilder.group({
      titre:['',[Validators.required, Validators.minLength(3)]],
      dateOffre:['',[Validators.required]],
      dateFin:['',[Validators.required]],
      poste:['',[Validators.required, Validators.minLength(3)]],
      lieu:['',[Validators.required, Validators.minLength(3)]],
      type:['',[Validators.required]],
      niveau:['',[Validators.required]],
      description:['',[Validators.required, Validators.minLength(3)]],
      anneeExp:['',[Validators.required, Validators.pattern(/^([0-9]$)+/)]]
    },
    {
      validator: MustMoreThan('dateFin','dateOffre')
    });
  }
  get fOf() { return this.offreForm.controls; }

  clickCompetence(id){
    let i=0;
    while(i<this.comps.length && this.comps[i].id!==id)
    {
      i++;
    }
    this.compsSelected.push(this.comps[i]);
    this.comps.splice(i,1);
    this.competences=of(this.comps);
    this.competencesSelected=of(this.compsSelected);
  }
  removeCompetence(id,titre){
    let i:number;
    if(!id)
    {
      this.compsSelected.map((el,ind)=>{
        if(el.titre.toLocaleLowerCase()===titre.toLocaleLowerCase()){
          i=ind;
          return;
        }
      });
      this.compsSelected.splice(i,1);
      this.competencesSelected=of(this.compsSelected);
      return;
    }
    i=0;
    while(i<this.compsSelected.length && this.compsSelected[i].id!==id)
    {
      i++;
    }
    this.comps.push(this.compsSelected[i]);
    this.compsSelected.splice(i,1);
    this.competences=of(this.comps);
    this.competencesSelected=of(this.compsSelected);
  }
  ajouter(){
    if(this.newComp===""){
      return;
    }
    let i:number=-1;
    this.compsSelected.map((el,ind)=>{
      if(el.titre.toLocaleLowerCase()===this.newComp.toLocaleLowerCase()){
        i=ind;
        return;
      }
    });
    if(i!==-1)
    {
      return;
    }
    let c:Competence=new Competence(this.newComp);
    this.compsSelected.push(c);
    this.competencesSelected=of(this.compsSelected);
    this.newComp="";
  }
  enregistrerOffre(){
    this.submittedOffre=true;
    if(this.offreForm.invalid)
    {
      return;
    }
    this.loadingOf=true;
    let formValue=this.offreForm.value;
    let o:Offre=new Offre(null,null,null,null,null,null,null,null,null,null,null,null);
    o.titre=formValue['titre'];
    o.poste=formValue['poste'];
    o.lieu=formValue['lieu'];
    o.description=formValue['description'];
    o.anneeExperience=formValue['anneeExp'];
    o.dateOffre=new Date(formValue['dateOffre']);
    o.dateFin=new Date(formValue['dateFin']);
    switch(formValue['type']){
      case "Temps Plein":{
        o.typeOffre=TypeOffre.TempsPlein;
        break;
      }
      case "Temps Partiel":{
        o.typeOffre=TypeOffre.TempsPartiel;
        break;
      }
      case "CDD ou mission ponctuelle":{
        o.typeOffre=TypeOffre.CDD;
        break;
      }
      case "Travail Temporaire":{
        o.typeOffre=TypeOffre.TravailTemporaire;
        break;
      }
      case "Stagiaire":{
        o.typeOffre=TypeOffre.Stagiaire;
        break;
      }
    }
    switch(formValue['niveau']){
      case "BAC":{
        o.niveauDemande=Niveau.Bac;
        break;
      }
      case "Licence":{
        o.niveauDemande=Niveau.Licence;
        break;
      }
      case "Mastère":{
        o.niveauDemande=Niveau.Mastere;
        break;
      }
      case "Ingénieur":{
        o.niveauDemande=Niveau.Ingenieur;
        break;
      }
      case "Autre niveau":{
        o.niveauDemande=Niveau.Autre;
        break;
      }
    }
    
    o.competences=this.compsSelected;
    this.organisme.subscribe((or)=>{
      o.organisme=or;
    });
    o.idManager=this.idManager;
    this.offresService.addOffre(o).subscribe((data)=>{
      this.offresService.offres.push(data);
      this.offresService.offresSubject.next(this.offresService.offres);
      this.toastr.success("Cette offre a été ajoutée avec succès");
      this.loadingOf=false;
      this.offreSaved=true;
      console.log(data);
      console.log(this.loadingOf)
    },
    (error)=>{
      this.toastr.warning(error.error.message);
      this.loadingOf=false;
    });
  }
  reset()
  {
    this.offreForm.reset();
  }
  /*****************************/
  ngOnDestroy(): void {
    this.orgSubscription.unsubscribe();
    this.typesSubscription.unsubscribe();
    this.niveausSubscription.unsubscribe();
    this.competencesSubscription.unsubscribe();
  }

}