import { FormControl, FormGroup } from '@angular/forms';

export function requiredFileType( type: string ) {
    return function (control: FormControl) {
      const file = control.value;
      if ( file ) {
        const extension = file.name.split('.')[1].toLowerCase();
        if ( type.toLowerCase() !== extension.toLowerCase() ) {
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