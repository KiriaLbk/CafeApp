import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { AuthService } from '../../auth.service';
import { ErrorsService } from '../../form/form.errors.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  sub: Subscription;
  employeeForm: FormGroup;
  formErrors = {
    fullName: '',
    pass: '',
    email: ''
  };

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private router: Router,
    private errService: ErrorsService,
    private authService: AuthService
    ) {
      this.title.setTitle('Authorization');
    }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z0-9]*')]],
      pass: ['', [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z0-9]*')]]
    });
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logErrors();
    });
  }

  ngOnDestroy(): void{
    // this.sub.unsubscribe();
  }

  logErrors(): void{
    Object.assign(this.formErrors, this.errService.logValidationErrors(this.employeeForm));
  }

  onSubmit(): void{
    const user: IUser = {
      login: this.employeeForm.get('fullName').value,
      pass: this.employeeForm.get('pass').value
    };
    this.sub = this.authService.authUser('http://localhost:3000/auth', user).subscribe((date) => {
      if (date.success) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Авторизация успешно пройдена.',
          showConfirmButton: false,
          timer: 1500
        });
        if (this.authService.isLoggedIn()) {
          this.router.navigate([`/${this.authService.getRoleFromToken()}`]);
        }
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Атворизация провалена.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/reg']);
      }
    });
  }

}
