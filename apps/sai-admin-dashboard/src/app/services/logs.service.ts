import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private token: string = this.cookieService.get('token');

  public getLogs() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/logs`, options);
  }
}
