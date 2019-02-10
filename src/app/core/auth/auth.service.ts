import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAuthData, IUser, User } from '@app/shared';
import { BehaviorSubject, Observable, of } from 'rxjs';

const lsKey: string = 'ngCourses';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;
  user: IUser = new User(0, 'Ivan', 'Hrushevich');

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  isAuthenticated: boolean = true;

  private readonly _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  login(authData: IAuthData): Observable<IUser> {
    this.userData = authData;
    localStorage.setItem(lsKey, JSON.stringify(authData));
    this._isAuthenticated.next(true);
    this.isAuthenticated = true;
    window.console.log('logged in successfully');

    return of(this.user);
  }
  // login(authData: IAuthData): Observable<IUser> {
  //   const url: string = 'http://localhost:3004/auth/login';
  //   // const params: {} = {
  //   // login: 'Sparks',
  //   // password: 'consectetur'
  //   // };

  //   return this.http.post<IUser>(url, { login: 'Warner', password: 'ea' });
  // }

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
