import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { PostDTO } from '../interfaces';
import { CommentDTO } from '../interfaces/commentDTO';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  private token: string = this.cookieService.get('token');

  public getAllPost() {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(`${environment.URL}/social-media/post/all`, options);
  }

  public getPostById(postId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(
      `${environment.URL}/social-media/post/${postId}`,
      options
    );
  }

  public getUsersPost(userId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(
      `${environment.URL}/social-media/admin/post/user/${userId}`,
      options
    );
  }

  public deletePostById(postId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.delete(
      `${environment.URL}/social-media/del/${postId}`,
      options
    );
  }

  public shareTextPost(post: PostDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.post(
      `${environment.URL}/social-media/share/text`,
      post,
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
      `${environment.URL}/social-media/upload/image`,
      options
    );
  }

  public shareImagePost(post: any) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.post(
      `${environment.URL}/social-media/share/image`,
      post,
      options
    );
  }

  public sharePoolPost(post: PostDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.post(
      `${environment.URL}/social-media/share/pool`,
      post,
      options
    );
  }

  public postLike(postId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const params = new HttpParams().set('postId', postId);
    const options = {
      headers: headers,
      params: params,
    };
    return this.http.patch(
      `${environment.URL}/social-media/post/like`,
      {},
      options
    );
  }

  public getPostComments(postId: string) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.get(
      `${environment.URL}/social-media/comments/${postId}`,
      options
    );
  }

  public shareComment(postComment: CommentDTO) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const options = {
      headers: headers,
    };
    return this.http.post(
      `${environment.URL}/social-media/share/comment`,
      postComment,
      options
    );
  }

  public answerPool(poolId: string, answer: number) {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    const params: HttpParams = new HttpParams()
      .set('poolId', poolId)
      .set('answer', answer);
    const options = {
      headers: headers,
      params: params,
    };
    return this.http.post(
      `${environment.URL}/social-media/pool/answer`,
      {},
      options
    );
  }
}
