import { Injectable } from '@angular/core';

import { IAuthData, IUser, User } from '@app/shared';
import { BehaviorSubject, Observable, of } from 'rxjs';

const lsKey: string = 'ngCourses';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;

  private readonly _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  login(authData: IAuthData): Observable<IUser> {
    this.userData = authData;
    localStorage.setItem(lsKey, JSON.stringify(authData));
    this._isAuthenticated.next(true);
    window.console.log('logged in successfully');

    const mockedUser: IUser = new User(0, 'Ivan', 'Hrushevich');

    return of(mockedUser);
  }

  logout(): Observable<IUser> {
    localStorage.removeItem(lsKey);
    this.userData = null;
    this._isAuthenticated.next(false);
    window.console.log('logout');

    const mockedUser: IUser = new User(0, 'Ivan', 'Hrushevich');

    return of(mockedUser);
  }

  getUserInfo(): Observable<IUser> {
    const mockedUser: IUser = new User(0, 'Ivan', 'Hrushevich');

    return of(mockedUser);
  }
}
