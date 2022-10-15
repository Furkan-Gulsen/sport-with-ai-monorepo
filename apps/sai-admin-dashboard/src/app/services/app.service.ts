import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private token: string = this.cookieService.get('token');

  public editPrivacyPolicy(privacyPolicy: any) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.patch(
      `${environment.URL}/privacy-policy`,
      privacyPolicy,
      options
    );
  }

  public getPrivacyPolicy() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/privacy-policy`, options);
  }
}
