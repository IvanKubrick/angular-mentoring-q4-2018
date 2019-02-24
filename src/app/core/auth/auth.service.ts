import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAuthData, IUser, User } from '@app/shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserInfo } from 'src/app/userInfo.model';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from './store/auth.actions';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;
  user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  private readonly _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient, private store: Store<fromApp.IAppState>) {}

  login(authData: IAuthData): Observable<IUser> {
    const url: string = 'http://localhost:3004/auth/login';

    return this.http.post<IUser>(url, { login: authData.login, password: authData.password });
  }

  logout(): void {
    // localStorage.removeItem('angularCoursesToken');
    // this.userData = null;
    // this._isAuthenticated.next(false);
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
  }

  getUserInfo(token: string): Observable<IUserInfo> {
    const url: string = 'http://localhost:3004/auth/userinfo';

    return this.http.post<IUserInfo>(url, null);
  }

  authenticate(): void {
    this._isAuthenticated.next(true);
  }

  revealUserData(token: string, firstName: string, lastName: string): void {
    this.user.next(new User(token, firstName, lastName));
  }

  getToken(): string | null {
    return localStorage.getItem('angularCoursesToken');
  }
}
