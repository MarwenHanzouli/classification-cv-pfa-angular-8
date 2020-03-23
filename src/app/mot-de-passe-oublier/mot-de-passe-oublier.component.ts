import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-mot-de-passe-oublier',
  templateUrl: './mot-de-passe-oublier.component.html',
  styleUrls: ['./mot-de-passe-oublier.component.css']
})
export class MotDePasseOublierComponent implements OnInit {

  private resetForm:FormGroup;
  private submitted:boolean=false;
  private loading:boolean=false;
  private sent:boolean=false;
  private message:string[]=["Votre demande de récupération a été envoyée avec succès.", "Un email de confirmation a été envoyé à l'adresse: ","Vous pouvez réinitialiser votre mot de passe."];
  constructor(private formBuilder: FormBuilder,
              private authService: AuthentificationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
  }
  initForm()
  {
    this.resetForm = this.formBuilder.group(
      {
        email: ['', [Validators.required,Validators.email]]
      }
    );
  }
  get f() { return this.resetForm.controls; }
  onSubmitForm(){
    this.submitted=true;
    if(this.resetForm.invalid)
    {
      return ;
    }
    let resetPassword={
      "email":this.resetForm.value["email"]
    }
    //console.log(user);
    this.loading=true;
    this.authService.resetPassword(resetPassword).subscribe((response)=>{
      console.log(response);
      this.sent=true;
      this.loading=false;
    },
    (error)=>{
      this.toastr.warning("Ce email ne correspond à aucun compte");
      this.loading=false;
      this.sent=false;
    })
  }
}
