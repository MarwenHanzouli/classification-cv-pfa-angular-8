import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  isCandidat:boolean=false;
  isManager:boolean=false;
  user:string;
  userForm: FormGroup;
  mdpValide:boolean=false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      prenom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      telephone: ['', [Validators.required,Validators.minLength(8),
      Validators.pattern(/^(\+[0-9]{3})[0-9]+/)]],
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
    const formValue = this.userForm.value;
    const newUser = [
      formValue['nom'],
      formValue['prenom'],
      formValue['telephone'],
      formValue['username'],
      formValue['email'],
      formValue['mdp1'],
      formValue['mdp2'],
      formValue['role'],
      formValue['institut'],
      formValue['niveau'],
      formValue['date_naissance'],
      formValue['diplome'],
      formValue['adresse'],
      formValue['ville'],
      formValue['etat'],
      formValue['cp'],
      formValue['entreprise'],  
    ];
    alert(newUser);
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
