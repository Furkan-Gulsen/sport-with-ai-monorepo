import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast-service';
import { LoginDTO, RegisterDTO } from '../../interfaces';
import { AuthService } from '../../services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private toastService: ToastService,
    private cookieServcie: CookieService,
    private router: Router
  ) {}
  public email: FormControl = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ])
  );
  public password: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.minLength(8)])
  );
  public username: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.minLength(8)])
  );
  public height: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required])
  );
  public width: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required])
  );
  public birthDay: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required])
  );
  public goal: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required])
  );
  public gender: FormControl = new FormControl(
    '',
    Validators.compose([Validators.required])
  );

  ngOnInit(): void {
    // console.log(new Date().toISOString().substring(0, 10));
  }

  public register() {
    if (!this.email.valid) {
      this.toastService.errorToast('Enter your email address correctly.');
    } else if (!this.password.valid) {
      this.toastService.errorToast('Enter your password  correctly.');
    } else if (!this.goal.valid) {
      this.toastService.errorToast('Enter your goal correctly.');
    } else if (!this.username.valid) {
      this.toastService.errorToast('Enter your username correctly.');
    } else if (!this.width.valid) {
      this.toastService.errorToast('Enter your width correctly.');
    } else if (!this.height.valid) {
      this.toastService.errorToast('Enter your height correctly.');
    } else if (!this.birthDay.valid) {
      this.toastService.errorToast('Enter your birthDay correctly.');
    } else if (!this.gender.valid) {
      this.toastService.errorToast('Enter your gender correctly.');
    } else {
      let registerDTO: RegisterDTO = {
        email: this.email.value,
        password: this.password.value,
        username: this.username.value,
        goal: this.goal.value,
        width: Number(this.password.value),
        height: Number(this.height.value),
        birthDay: this.password.value,
        gender: this.password.value,
      };
      this.authSvc.register(registerDTO).subscribe(
        (res: any) => {
          if (res.name && res.name == 'HttpException') {
            this.toastService.errorToast(
              'Registration failed. Please make sure you have typed your information correctly.'
            );
          } else {
            this.cookieServcie.set('token', res.token, 7);
            this.router.navigate(['home']);
          }
        },
        (err) => {
          this.toastService.errorToast(err.error.message);
        }
      );
    }
  }
}
