import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

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
              private toastr: ToastrService) { }

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
    console.log(user);

    this.loading=true;
    this.authService.login(user).pipe(first()).subscribe((response)=>{
      console.log(response);
      this.error=false;
    },
    (error)=>{
      if(error['status']==401)
      {
        this.error=true;
        this.toastr.error("Ces informations ne correspondent à aucun compte","Erreur de connexion");
      }
      console.log(error);
    });
    
    this.loading=false;
  }
}
