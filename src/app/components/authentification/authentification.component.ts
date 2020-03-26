import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  authForm: FormGroup;
  submitted: boolean=false;
  loading:boolean=false;
  autenticated:boolean=false;
  error:boolean=false;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthentificationService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm()
  {
    this.authForm = this.formBuilder.group(
      {
        emailOrUsername: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }
  get f() { return this.authForm.controls; }

  onSubmitForm(){
    this.submitted=true;
    if(this.authForm.invalid)
    {
      return ;
    }
    let user={
      "username":this.authForm.value["emailOrUsername"],
      "password":this.authForm.value["password"]
    }
    //console.log(user);

    this.loading=true;
    this.authService.login(user).pipe(first()).subscribe((response)=>{
      //console.log(response);
      this.error=false;
      this.loading=false;
      //console.log(this.authService.currentUserValue);
      if(response['user']['role']==="CANDIDAT")
      {
        this.router.navigate(['/candidat',{ outlets: {
          authenticated: ['actualites']}}]);
      }
      else if(response['user']['role']==="MANAGER")
      {
        this.router.navigate(['/accueil']);
      }
      else if(response['user']['role']==="ADMIN")
      {
        this.router.navigate(['/accueil']);
      }
    },
    (error)=>{
      if(error['status']==401)
      {
        this.error=true;
        
        this.toastr.error("Ces informations ne correspondent à aucun compte","Erreur de connexion");
      }
      console.log(error);
      this.loading=false;
    });
    
    
  }
  naviguer(path) {
    this.router.navigate([{ outlets: {
      authenticated: [path]
    }}]);
  }
}