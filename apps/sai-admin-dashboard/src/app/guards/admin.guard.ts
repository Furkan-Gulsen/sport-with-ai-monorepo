import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserDTO } from '../interfaces';
import { UserService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let status: boolean = true;
    await this.userService
      .getMyProfile()
      .toPromise()
      .then((_user: UserDTO) => {
        if (_user.role != 'admin') {
          status = false;
          this.cookieService.deleteAll();
          this.router.navigate(['login']);
        }
      })
      .catch((err) => {
        console.log('error: ', err);
        status = false;
        this.cookieService.deleteAll();
        this.router.navigate(['login']);
      });
    return status;
  }
}
