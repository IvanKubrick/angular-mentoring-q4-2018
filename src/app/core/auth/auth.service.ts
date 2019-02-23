import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAuthData, IUser, User } from '@app/shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserInfo } from 'src/app/userInfo.model';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;
  user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  isAuthenticated: boolean = false;

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  private readonly _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  login(authData: IAuthData): Observable<IUser> {
    const url: string = 'http://localhost:3004/auth/login';

    return this.http.post<IUser>(url, { login: authData.login, password: authData.password });
  }

  logout(): void {
    localStorage.removeItem('angularCoursesToken');
    this.userData = null;
    this.isAuthenticated = false;
    this._isAuthenticated.next(false);
    this.user.next(null);
  }

  getUserInfo(token: string): Observable<IUserInfo> {
    const url: string = 'http://localhost:3004/auth/userinfo';

    return this.http.post<IUserInfo>(url, null);
  }

  authenticate(): void {
    this.isAuthenticated = true;
    this._isAuthenticated.next(true);
  }

  revealUserData(token: string, firstName: string, lastName: string): void {
    this.user.next(new User(token, firstName, lastName));
  }

  getToken(): string | null {
    return localStorage.getItem('angularCoursesToken');
  }
}
