import { Injectable } from '@angular/core';
import { validationMessages } from './form.messages';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  formErrors = {
    fullName: '',
    pass: '',
    email: ''
  };

  constructor() { }

  logValidationErrors(group: FormGroup): {}{
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
          const messages = validationMessages[key];
          for (const errorKey in abstractControl.errors){
            if (errorKey) {
              this.formErrors[key] += messages[errorKey];
              break;
            }
          }
        }
      }
    });
    return this.formErrors;
  }

}
