import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast-service';
import { LoginDTO } from '../../interfaces';
import { AuthService } from '../../services';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
    Validators.compose([Validators.required, Validators.minLength(5)])
  );

  ngOnInit(): void {}

  login() {
    if (!this.email.valid || !this.password.valid) {
      this.toastService.errorToast(
        'Enter your email address or password correctly.'
      );
    } else {
      let loginDTO: LoginDTO = {
        email: this.email.value,
        password: this.password.value,
      };
      this.authSvc.login(loginDTO).subscribe(
        (res: any) => {
          if (res.name && res.name == 'HttpException') {
            this.toastService.errorToast(
              'Enter your email address or password correctly.'
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
