import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { WebRequestService } from '../shared/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private webRequestService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webRequestService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        //The auth tokens will be in the header of this response
        this.setSession(res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log('LOGGED IN!!!');
        localStorage.setItem('userId', res.body._id);
      })
    )
  }

  private setSession(accessToken, refreshToken){
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
  }

  private removeSession() {
    localStorage.clear();
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken(accessToken) {
    return localStorage.setItem('x-access-token', accessToken);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webRequestService.ROOT_URL}/users/me/access-token`,{
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'))
      })
    )
  }

}
