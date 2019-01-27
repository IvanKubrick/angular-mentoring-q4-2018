import { Injectable } from '@angular/core';

import { IAuthData, IUser, User } from '@app/shared';
import { BehaviorSubject, Observable, of } from 'rxjs';

const lsKey: string = 'ngCourses';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;
  user: IUser = new User(0, 'Ivan', 'Hrushevich');

  private readonly _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  login(authData: IAuthData): Observable<IUser> {
    this.userData = authData;
    localStorage.setItem(lsKey, JSON.stringify(authData));
    this._isAuthenticated.next(true);
    window.console.log('logged in successfully');

    return of(this.user);
  }

  logout(): Observable<IUser> {
    localStorage.removeItem(lsKey);
    this.userData = null;
    this._isAuthenticated.next(false);
    window.console.log('logout');

    return of(this.user);
  }

  getUserInfo(): Observable<IUser> {
    return of(this.user);
  }
}
