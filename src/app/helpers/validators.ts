import { FormControl, FormGroup } from '@angular/forms';

export function requiredFileType( type: string[] ) {
    return function (control: FormControl) {
      const file = control.value;
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        let valid:boolean=false;
        let i=0;
        while(i<type.length && !valid)
        {
          if(type[i].toLowerCase() === extension.toLowerCase())
          {
            valid=true;
          }
          else i++;
        }
        if (!valid) {
            
          return {
            requiredFileType: true
          };
        }
        return null;
      }
      return null;
    };
  }
  export function  MustMatch(controlName: string, matchingControlName: string) 
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

  export function  MustMoreThan(controlName: string, matchingControlName: string) 
  {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMoreThan) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (Date.parse(control.value) <= Date.parse(matchingControl.value)) {
            control.setErrors({ mustMoreThan: true });
        } else {
            control.setErrors(null);
        }
    }
  } 