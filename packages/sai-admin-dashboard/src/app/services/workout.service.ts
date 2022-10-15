import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { ActivityDayDTO } from '../interfaces';
import { WorkoutDTO } from '../interfaces/workoutDTO';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private token: string = this.cookieService.get('token');

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
      `${environment.URL}/workout/upload/image`,
      options
    );
  }

  public createWorkout(workout: WorkoutDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.post(`${environment.URL}/workout`, workout, options);
  }

  public editWorkout(workout: WorkoutDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.patch(`${environment.URL}/workout`, workout, options);
  }

  public getWorkouts() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/workouts`, options);
  }

  public createActivityDay(workoutId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const params: Params = new HttpParams().set('workoutId', workoutId);
    const options = {
      headers: headers,
      params: params,
    };
    return this.http.post(`${environment.URL}/activity-day`, {}, options);
  }

  public deleteActivityDay(workoutId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const params: Params = new HttpParams().set('workoutId', workoutId);
    const options = {
      headers: headers,
      params: params,
    };
    return this.http.delete(`${environment.URL}/activity-day`, options);
  }

  public updateActivityDay(activityDayBody: ActivityDayDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.patch(
      `${environment.URL}/activity-day`,
      activityDayBody,
      options
    );
  }
}
