import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { RegisterDTO } from '../interfaces';
import { LoginDTO } from '../interfaces/LoginDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public login(loginDTO: LoginDTO) {
    return this.http.patch(
      `${environment.URL}/auth/signin`,
      {
        ...loginDTO,
      },
      {}
    );
  }

  public register(registerDTO: RegisterDTO) {
    return this.http.post(
      `${environment.URL}/auth/signup`,
      {
        ...registerDTO,
      },
      {}
    );
  }
}
