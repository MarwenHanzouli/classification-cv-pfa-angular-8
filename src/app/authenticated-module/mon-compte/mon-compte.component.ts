import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { requiredFileType, MustMatch } from '../../helpers/validators';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  private user:User;

  private userForm:FormGroup;

  private formPhoto:FormGroup;
  private photoSubmitted=false;
  private urlImg:any;

  private formPassword: FormGroup;

  constructor(private fb: FormBuilder) { 
  }
  
  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem("currentUser"))["user"];
    this.initForm();
    this.initFormPhoto();
    this.initFormPassword();
  }
  
   /*******************update user**************************/
  initForm() {
    this.userForm = this.fb.group({
      nom: [this.user.name, [Validators.required,Validators.minLength(3)]],
      prenom: [this.user.lastName, [Validators.required,Validators.minLength(3)]],
      email: [this.user.email, [Validators.required,Validators.email]],
      telephone: [this.user.telephone, [Validators.required,Validators.minLength(8),
      Validators.pattern(/^([0-9]{3})[0-9]+/)]],
      username: [this.user.username, [Validators.required, Validators.minLength(3)]],
      diplome: this.user.diplome,
      institut: this.user.institut,
      niveau: this.user.niveau,
      adresse: this.user.address ? this.user.address.address : '',
      ville: this.user.address ? this.user.address.city : '',
      etat: this.user.address ? this.user.address.country : '',
      cp: this.user.address ? this.user.address.postcode : '',
      entreprise:this.user.nameEntreprise
    });
  }
  
  get f() { return this.userForm.controls; }
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
}
