import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { IUser } from '../../models/user';
import { AuthService } from '../../auth.service';
import { ErrorsService } from '../../form/form.errors.service';
import { CheckLoginService } from '../../check.login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit, OnDestroy {
  sub: Subscription;
  employeeForm: FormGroup;
  formErrors = {
    fullName: '',
    pass: '',
    email: '',
  };

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private router: Router,
    private errService: ErrorsService,
    private authService: AuthService,
    private checkLogin: CheckLoginService
  ) {
    this.title.setTitle('Registration');
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z0-9]*'),
        ],
      ],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[A-Za-z0-9]*'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[mail]+[.]+[a-z]{2,4}'),
        ],
      ],
    });
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logErrors();
    });
  }
  logErrors(): void {
    Object.assign(
      this.formErrors,
      this.errService.logValidationErrors(this.employeeForm)
    );
  }

  onSubmit(): void {
    const user: IUser = {
      login: this.employeeForm.get('fullName').value,
      pass: this.employeeForm.get('pass').value,
      email: this.employeeForm.get('email').value,
    };
    this.sub = this.checkLogin.checkLogin('http://localhost:3000/reg/test', user).subscribe((date) => {
        if (!date.success) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Такой пользователь уже существует.',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          this.authService.regUser('http://localhost:3000/reg', user).subscribe((dates) => {
              if (dates.success) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Регистрация успешно пройдена.',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.router.navigate(['/auth']);
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Регистрация провалена.',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  }
}
