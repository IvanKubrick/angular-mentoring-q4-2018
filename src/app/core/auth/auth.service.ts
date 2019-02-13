import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAuthData, IUser, User } from '@app/shared';
import { BehaviorSubject, Observable, of } from 'rxjs';

const lsKey: string = 'ngCourses';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;
  user: IUser = new User('token', 'Ivan', 'Hrushevich');

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  isAuthenticated: boolean = true;

  private readonly _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  login(authData: IAuthData): Observable<IUser> {
    const url: string = 'http://localhost:3004/auth/login';

    return this.http.post<IUser>(url, { login: authData.login, password: authData.password });
  }

  logout(): Observable<IUser> {
    localStorage.removeItem(lsKey);
    this.userData = null;
    this.isAuthenticated = false;
    this._isAuthenticated.next(false);
    window.console.log('logout');

    return of(this.user);
  }

  getUserInfo(): Observable<IUser> {
    return of(this.user);
  }
}
