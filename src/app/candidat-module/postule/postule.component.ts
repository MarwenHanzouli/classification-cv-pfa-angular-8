import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/helpers/validators';

@Component({
  selector: 'app-postule',
  templateUrl: './postule.component.html',
  styleUrls: ['./postule.component.css']
})
export class PostuleComponent implements OnInit {

  private form:FormGroup;
  private urlImg:any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    //.pdf,.jpg,.png,.jpeg,.bmp,.gif,.tif,.tiff,.webp"
    this.form=this.formBuilder.group({
      file: [null, [Validators.required, requiredFileType('png')]]
    });
  }
  get f() { return this.form.controls; }
  getFile(fileData:any){
    this.urlImg=fileData;
    //this.photoSubmitted=false;
  }
}
