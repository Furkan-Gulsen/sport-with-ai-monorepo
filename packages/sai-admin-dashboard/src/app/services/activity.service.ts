import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { ActivityDTO } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private token: string = this.cookieService.get('token');

  public getActivities() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/activities`, options);
  }

  public createActivity(activityDTO: ActivityDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.post(`${environment.URL}/activity`, activityDTO, options);
  }

  public updateActivity(activityDTO: ActivityDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.patch(`${environment.URL}/activity`, activityDTO, options);
  }

  public deleteActivity(id: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.delete(`${environment.URL}/activity/${id}`, options);
  }

  public addActivityInActivityDay(activityDayId: string, activityId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const params: HttpParams = new HttpParams()
      .set('activityDayId', activityDayId)
      .set('activityId', activityId);
    const options = {
      headers: headers,
      params: params,
    };
    return this.http.patch(
      `${environment.URL}/activity-day/add-activity`,
      {},
      options
    );
  }

  public removeActivityInActivityDay(
    activityDayId: string,
    activityId: string
  ) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const params: HttpParams = new HttpParams()
      .set('activityDayId', activityDayId)
      .set('activityId', activityId);
    const options = {
      headers: headers,
      params: params,
    };
    return this.http.patch(
      `${environment.URL}/activity-day/remove-activity`,
      {},
      options
    );
  }

  public uploadImage(name: string, file: any) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    let fd = new FormData();
    fd.append('file', file);
    const options = {
      body: fd,
      headers: headers,
    };
    return this.http.request(
      'post',
      `${environment.URL}/activity/upload/image`,
      options
    );
  }
}
