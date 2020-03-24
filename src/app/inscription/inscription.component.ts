import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { Address } from '../models/Address.model';
import { RegistrationService } from '../services/registration.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit,OnDestroy {

  registred:boolean;
  isCandidat:boolean=false;
  isManager:boolean=false;
  user:string;
  userForm: FormGroup;
  mdpValide:boolean=false;
  submitted = false;
  registerSubscription: Subscription;
  loading=false;
  private message:string[]=["Votre inscription a été effectuée avec succès.", "Un email de confirmation a été envoyé à l'adresse: ","Vous devez confirmer votre compte."];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private registrationService: RegistrationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.registred=false;
    this.initForm();
  }
  ngOnDestroy() {
    //this.registerSubscription.unsubscribe();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      prenom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      telephone: ['', [Validators.required,Validators.minLength(8),
      Validators.pattern(/^([0-9]{3})[0-9]+/)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      mdp1: ['', [Validators.required, Validators.minLength(3)]],
      mdp2: ['', [Validators.required]],
      role: ['', Validators.required],
      date_naissance: '',
      diplome: '',
      institut: '',
      niveau: '',
      adresse: '',
      ville: '',
      etat: '',
      cp: '',
      entreprise:''
    },{
      validator: this.MustMatch('mdp1', 'mdp2')
    });
  }
  
  get f() { return this.userForm.controls; }

  onChange(value?)
  {
    this.submitted=false;
    if (value == "MANAGER" ) 
    {
      this.isManager=true;
      this.isCandidat=false;
      this.userForm.get('entreprise').setValidators(Validators.required);
      this.userForm.get('entreprise').updateValueAndValidity();

      this.userForm.get('institut').setValue('');
      this.userForm.get('institut').clearValidators();
      this.userForm.get('institut').updateValueAndValidity();

      this.userForm.get('diplome').setValue('');
      this.userForm.get('diplome').clearValidators();
      this.userForm.get('diplome').updateValueAndValidity();

      this.userForm.get('niveau').setValue('');
      this.userForm.get('niveau').clearValidators();
      this.userForm.get('niveau').updateValueAndValidity();

      this.userForm.get('adresse').setValue('');
      this.userForm.get('adresse').clearValidators();
      this.userForm.get('adresse').updateValueAndValidity();

      this.userForm.get('etat').setValue('');
      this.userForm.get('etat').clearValidators();
      this.userForm.get('etat').updateValueAndValidity();

      this.userForm.get('ville').setValue('');
      this.userForm.get('ville').clearValidators();
      this.userForm.get('ville').updateValueAndValidity();

      this.userForm.get('cp').setValue('');
      this.userForm.get('cp').clearValidators();
      this.userForm.get('cp').updateValueAndValidity();

      this.userForm.get('date_naissance').setValue('');
      this.userForm.get('date_naissance').clearValidators();
      this.userForm.get('date_naissance').updateValueAndValidity();
    }
    else if(value == "CANDIDAT")
    {
      this.isManager=false;
      this.isCandidat=true;
      this.userForm.get('entreprise').setValue('');
      this.userForm.get('entreprise').clearValidators();
      this.userForm.get('entreprise').updateValueAndValidity();

      this.userForm.get('cp').setValidators(Validators.required);
      this.userForm.get('etat').setValidators(Validators.required);
      this.userForm.get('etat').setValue('');
      this.userForm.get('date_naissance').setValidators(Validators.required);
      this.userForm.get('adresse').setValidators(Validators.required);
      this.userForm.get('niveau').setValidators(Validators.required);
      this.userForm.get('niveau').setValue('');
      this.userForm.get('institut').setValidators(Validators.required);
      this.userForm.get('diplome').setValidators(Validators.required);
      this.userForm.get('ville').setValidators(Validators.required);
    }
    else if(value=="")
    {
      this.isManager=false;
      this.isCandidat=false;
      this.userForm.get('institut').setValue('');
      this.userForm.get('institut').clearValidators();
      this.userForm.get('institut').updateValueAndValidity();

      this.userForm.get('diplome').setValue('');
      this.userForm.get('diplome').clearValidators();
      this.userForm.get('diplome').updateValueAndValidity();

      this.userForm.get('niveau').setValue('');
      this.userForm.get('niveau').clearValidators();
      this.userForm.get('niveau').updateValueAndValidity();

      this.userForm.get('adresse').setValue('');
      this.userForm.get('adresse').clearValidators();
      this.userForm.get('adresse').updateValueAndValidity();

      this.userForm.get('etat').setValue('');
      this.userForm.get('etat').clearValidators();
      this.userForm.get('etat').updateValueAndValidity();

      this.userForm.get('ville').setValue('');
      this.userForm.get('ville').clearValidators();
      this.userForm.get('ville').updateValueAndValidity();

      this.userForm.get('cp').setValue('');
      this.userForm.get('cp').clearValidators();
      this.userForm.get('cp').updateValueAndValidity();

      this.userForm.get('date_naissance').setValue('');
      this.userForm.get('date_naissance').clearValidators();
      this.userForm.get('date_naissance').updateValueAndValidity();

      this.userForm.get('entreprise').setValue('');
      this.userForm.get('entreprise').clearValidators();
      this.userForm.get('entreprise').updateValueAndValidity();
    }
  }
  onSubmitForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;}
    this.loading=true;
    const formValue = this.userForm.value;
    let u: User=new User(null,null,null,null,null,null,null,null);
    let adresse: Address=new  Address(null,null,null,null);
    u.username=formValue['username'];
    u.password=formValue['mdp1'];
    u.repassword=formValue['mdp2'];
    u.telephone=formValue['telephone'];
    u.email=formValue['email'];
    u.name=formValue['nom'];
    u.lastName=formValue['prenom'];
    u.roleName=formValue['role'];
    u.institut=formValue['institut'];
    u.niveau=formValue['niveau'];
    u.date_naissance=formValue['date_naissance'];
    u.diplome=formValue['diplome'];
    adresse.address=formValue['adresse'];
    adresse.city=formValue['ville'];
    adresse.country=formValue['etat'];
    adresse.postcode=formValue['cp'];
    u.address=adresse;
    u.nameEntreprise=formValue['entreprise'];
    this.registerSubscription=this.registrationService.register(u).subscribe(
    (data)=>{
      console.log(data);
      this.toastr.success("L'inscription est enregistrée avec succès","Succès")
      this.loading=false;
      this.registred=true;
      //this.router.navigate(['/authentification']);
    },
    (error)=>{
      console.log(error['status']);
       if(error['status']==504)
      {
        this.toastr.warning("Impossible de charger la ressource, actualiser la page ou de répéter la demande","Gateway Timeout");
      }
      else if(error['status']==404)
      {
        this.toastr.error(error['error']['message'],"Erreur d'inscription");
      }
      else if(error['status']==500)
      {
        this.toastr.error("Répéter votre demande","Erreur d'inscription");
      }
      
      console.log(error);
      this.loading=false;
      //console.log(error['error']['message']);
    });
    //this.router.navigate(['/users']);
  }

  MustMatch(controlName: string, matchingControlName: string) 
  {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

}
