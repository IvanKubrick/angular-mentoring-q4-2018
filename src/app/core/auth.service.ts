import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IAuthData } from '@app/shared';

const lsKey: string = 'ngCourses';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;

  private _isAuthenticated: boolean;

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  constructor(private readonly router: Router) {}

  login(authData: IAuthData): void {
    this.userData = authData;
    localStorage.setItem(lsKey, JSON.stringify(authData));
    this._isAuthenticated = true;
    window.console.log('logged in successfully');

    this.router.navigate(['/courses']);
  }

  logout(): void {
    localStorage.removeItem(lsKey);
    this.userData = null;
    this._isAuthenticated = false;
    window.console.log('logout');

    this.router.navigate(['/']);
  }

  getUserInfo(): IAuthData {
    return this.userData;
  }
}
