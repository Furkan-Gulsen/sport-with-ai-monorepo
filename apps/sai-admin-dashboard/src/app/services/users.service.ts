import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private token: string = this.cookieService.get('token');

  public addUserFromAdmin(userBody: any) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.post(`${environment.URL}/user/add`, userBody, options);
  }

  public updateUserById(userId: string, userBody: any) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.patch(
      `${environment.URL}/admin/user/${userId}`,
      userBody,
      options
    );
  }

  public getUserById(userId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/user/${userId}`, options);
  }

  public deleteUserById(userId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.delete(`${environment.URL}/user/${userId}`, options);
  }

  public getUsers() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/users`, options);
  }

  public getMyProfile() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/getmyprofile`, options);
  }
}
