import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { requiredFileType, MustMatch } from '../../helpers/validators';
import { User } from 'src/app/models/User.model';
import { GestionUsersService } from 'src/app/services/gestion-users.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  private user:User;
  private subscription: Subscription;

  private userForm:FormGroup;
  private submitted:boolean=false;
  private loading:boolean=false;

  private formPhoto:FormGroup;
  private photoSubmitted=false;
  private urlImg:any;
  private loadingPhoto=false;

  private formPassword: FormGroup;
  private loadingPass=false;
  private passSubmitted=false;

  constructor(private authService:AuthentificationService,
              private fb: FormBuilder, 
              private el: ElementRef,
              private gestionUsersService:GestionUsersService,
              private toastr:ToastrService,
              private route: ActivatedRoute) { 
  }
  
  ngOnInit() {
    //console.log("xx");
    // this.subscription=this.route.data.subscribe((data: {rep: User})=>{
    //   this.user=data.rep['user'];
    //   console.log(this.user);
    //       this.initForm();
    //       this.initFormPhoto();
    //       this.initFormPassword();
    // });
    // this.authService.currentUser.subscribe(
    //   (rep)=>{
    //     if(rep)
    //     {
    //       this.user=rep['user'];
    //       // console.log(rep);
    //       console.log(this.user);
    //       this.initForm();
    //       this.initFormPhoto();
    //       this.initFormPassword();
    //     }
    // });
    this.user=JSON.parse(localStorage.getItem("currentUser"))["user"];
    this.initForm();
    this.initFormPhoto();
    this.initFormPassword();
  }
  
   /*******************update user**************************/
  faEdit=faEdit;
  initForm() {
    this.userForm = this.fb.group({
      nom: [{value:this.user.name,disabled:true}, [Validators.required,Validators.minLength(3)]],
      prenom: [{value:this.user.lastName,disabled:true}, [Validators.required,Validators.minLength(3)]],
      email: [{value:this.user.email,disabled:true}, [Validators.required,Validators.email]],
      telephone: [{value:this.user.telephone,disabled:true}, [Validators.required,Validators.minLength(8),
      Validators.pattern(/^([0-9]{3})[0-9]+/)]],
      username: [{value:this.user.username,disabled:true}, [Validators.required, Validators.minLength(3)]],
      diplome: {value:this.user.diplome,disabled:true},
      institut: {value:this.user.institut,disabled:true},
      niveau: {value:this.user.niveau, disabled:true},
      adresse: {value:this.user.address ? this.user.address.address : '',disabled:true},
      ville: {value:this.user.address ? this.user.address.city : '',disabled:true},
      etat: {value:this.user.address ? this.user.address.country : '',disabled:true},
      cp: {value:this.user.address ? this.user.address.postcode : '',disabled:true},
      entreprise:{value:this.user.nameEntreprise,disabled:true}
    });
  }
  
  get f() { return this.userForm.controls; }
  
  changeDisabled(indice){
    switch (indice)
    {
      case 0: {
        this.f['nom'].enable();
        this.el.nativeElement.querySelector('#nom').focus();
        break;
      }
      case 1: {
        this.f['prenom'].enable();
        this.el.nativeElement.querySelector('#prenom').focus();
        break;
      }
      case 2: {
        this.f['telephone'].enable();
        this.el.nativeElement.querySelector('#telephone').focus();
        break;
      }
      case 3: {
        this.f['email'].enable();
        this.el.nativeElement.querySelector('#email').focus();
        break;
      }
      case 4: {
        this.f['username'].enable();
        this.el.nativeElement.querySelector('#username').focus();
        break;
      }
      case 5: {
        this.f['niveau'].enable();
        this.el.nativeElement.querySelector('#niveau').focus();
        break;
      }
      case 6: {
        this.f['diplome'].enable();
        this.el.nativeElement.querySelector('#diplome').focus();
        break;
      }
      case 7: {
        this.f['institut'].enable();
        this.el.nativeElement.querySelector('#institut').focus();
        break;
      }
      case 8: {
        this.f['adresse'].enable();
        this.el.nativeElement.querySelector('#inputAddress').focus();
        break;
      }
      case 9: {
        this.f['ville'].enable();
        this.el.nativeElement.querySelector('#inputCity').focus();
        break;
      }
      case 10: {
        this.f['etat'].enable();
        this.el.nativeElement.querySelector('#inputState').focus();
        break;
      }
      case 11: {
        this.f['cp'].enable();
        this.el.nativeElement.querySelector('#inputZip').focus();
        break;
      }
      case 12: {
        this.f['entreprise'].enable();
        this.el.nativeElement.querySelector('#entreprise').focus();
        break;
      }
    }
    
  }
  
  onSubmitForm(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;}
    this.loading=true;
    const formValue = this.userForm.value;
    this.user.username=formValue['username'] || this.user.username;
    this.user.telephone=formValue['telephone'] || this.user.telephone;
    this.user.email=formValue['email'] || this.user.email;
    this.user.name=formValue['nom'] || this.user.name;
    this.user.lastName=formValue['prenom'] || this.user.lastName;
    if(this.user['role']=='CANDIDAT')
    {
      this.user.institut=formValue['institut']|| this.user.institut;
      this.user.niveau=formValue['niveau'] || this.user.niveau;
      this.user.diplome=formValue['diplome'] || this.user.diplome;
      this.user.address.address=formValue['adresse'] || this.user.address.address;
      this.user.address.city=formValue['ville'] || this.user.address.city;
      this.user.address.country=formValue['etat']  || this.user.address.country;
      this.user.address.postcode=formValue['cp'] || this.user.address.postcode;
      //console.log(this.user);
      this.gestionUsersService.updateCandidat(this.user).subscribe((reponse)=>{
        console.log("succes de modification");
        //console.log(reponse);
        this.gestionUsersService.changeInfoUserWhenUpdateHisProfile(this.user);
        //this.authService.currentUserSubject.next(this.user);
        this.loading=false;
        this.toastr.success("La modification a été éffectutée!","Succès");
      },
      (error)=>{
        console.log(error);
        this.loading=false;
        if(error['status']==401)
        {

        }
        this.toastr.error("La modification n'a pas été éffectutée!","Erreur");
      })
    }
    if(this.user['role']=='MANAGER')
    {
      this.user.nameEntreprise=formValue['entreprise'] || this.user.nameEntreprise;
      this.gestionUsersService.updateManager(this.user).subscribe((reponse)=>{
        console.log("succes de modification");
        //console.log(reponse);
        this.gestionUsersService.changeInfoUserWhenUpdateHisProfile(this.user);
        this.loading=false;
        this.toastr.success("La modification a été éffectutée!","Succès");
      },
      (error)=>{
        console.log(error);
        this.loading=false;
        if(error['status']==401)
        {

        }
        this.toastr.error("La modification n'a pas été éffectutée!","Erreur");
      });
    }
    if(this.user['role']=='ADMIN')
    {
      this.gestionUsersService.updateUser(this.user).subscribe((reponse)=>{
        console.log("succes de modification");
        console.log(reponse);
        //this.authService.changeInfoUserWhenUpdateHisProfile(this.user);
        this.loading=false;
        this.toastr.success("La modification a été éffectutée!","Succès");
      },
      (error)=>{
        console.log(error);
        this.loading=false;
        if(error['status']==401)
        {

        }
        this.toastr.error("La modification n'a pas été éffectutée!","Erreur");
      });
    
    }
    //console.log(this.user);

  }
  /*******************update photo**************************/
  initFormPhoto(){
    this.formPhoto=this.fb.group({
      file:[null, [Validators.required, requiredFileType('png')]]
    })
  }
  get fPh() { return this.formPhoto.controls; }
  updatePhoto(){
    this.photoSubmitted=true;
    if(this.formPhoto.invalid)
    {
      console.log(this.formPhoto.errors);
      return;
    }
    console.log(this.formPhoto.value);
  }
  getFile(fileData:any){
    this.urlImg=fileData;
    //this.photoSubmitted=false;
  }
  annulerPhoto(){
    this.urlImg=null;
    this.photoSubmitted=false;
  }
  submitPhoto(){
    this.photoSubmitted=true;
    
    if(this.formPhoto.invalid)
    {
      console.log(this.formPhoto.errors);
      return;
    }
    this.loadingPhoto=true;
    this.gestionUsersService.updatePhoto(this.formPhoto.get("file").value,this.user.id)
    .subscribe((reponse)=>{
      console.log(reponse);
      this.toastr.success("La photo a été modifiée!","Succès");
      this.loadingPhoto=false;
    },
    (error)=>{
      console.log(error);
      this.toastr.error("La photo n'a pas été modifiée!","Erreur");
      this.loadingPhoto=false;
    });
  }
   /*******************update mot de passe**************************/

   initFormPassword(){
     this.formPassword=this.fb.group({
      mdp1: ['', [Validators.required, Validators.minLength(3)]],
      mdp2: ['', [Validators.required]]
     },
     {
      validator: MustMatch('mdp1', 'mdp2')
     })
   }
   get fPass() { return this.formPassword.controls; }
  submitPassword(){
    this.passSubmitted=true;
    if(this.formPassword.invalid)
    {
    console.log(this.formPassword.errors);
    return;
    }
    this.loadingPass=true;
    let newPasswordObject={
      "email":this.user.email,
      "newPassword":this.formPassword.get("mdp1").value,
      "confirmNewPassword":this.formPassword.get("mdp2").value
    }
    this.gestionUsersService.updatePassword(newPasswordObject,this.user.id).subscribe(
      (reponse)=>{
        console.log(reponse);
        this.toastr.success("Le mot de passe a été modifié!","Succès");
        this.loadingPass=false;
      },
      (error)=>{
        console.log(error);
        this.toastr.error("Le mot de passe n'a pas été modifié!","Erreur");
        this.loadingPass=false;
      }
    )
   }
}
