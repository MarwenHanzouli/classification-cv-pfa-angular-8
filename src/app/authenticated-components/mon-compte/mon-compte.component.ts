import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { requiredFileType } from '../../validators';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  private formPhoto:FormGroup;
  private photoSubmitted=false;
  private urlImg:any;

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef) { 

  }
  
  ngOnInit() {
    this.initFormPhoto();
  }
  initFormPhoto(){
    this.formPhoto=this.fb.group({
      file:[null, [Validators.required, requiredFileType('png')]]
    })
  }
  get f() { return this.formPhoto.controls; }

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
}
