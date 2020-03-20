import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      telephone: ['', [Validators.required,Validators.minLength(8)]],
      username: ['', Validators.required],
      mdp1: ['', Validators.required],
      mdp2: ['', Validators.required],
      role: ['', Validators.required],
      date_naissance: ['', Validators.required],
      diplome: ['', Validators.required],
      institut: ['', Validators.required],
      niveau: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      etat: ['', Validators.required],
      cp: ['', Validators.required],
      entreprise:['', Validators.required]
    });
  }
  onSubmitForm() {
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
    console.log(newUser);
    //this.router.navigate(['/users']);
  }
  onChange(value?){
  if (value == "MANAGER" ) 
  {
    this.isManager=true;
    this.isCandidat=false;
  }
  else if(value == "CANDIDAT")
  {
    this.isManager=false;
    this.isCandidat=true;
  }
  else
  {
    this.isManager=false;
    this.isCandidat=false;
  }
  }
}
