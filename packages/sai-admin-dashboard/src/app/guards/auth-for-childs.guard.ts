import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthForChildsGuard implements CanActivateChild {
  constructor(private cookieService: CookieService, private router: Router) {}
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token: any = this.cookieService.get('token');
    if (token) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
