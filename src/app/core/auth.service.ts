import { Injectable } from '@angular/core';

import { IAuthData, IUser } from '@app/shared';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;

  private _isAuthenticated: boolean;

  get isAuthenticated(): boolean {
    return false;
  }

  login(authData: IAuthData): void {
    this._isAuthenticated = true;
  }

  logout(): void {
    window.console.log('logout');
    this.userData = null;
    this._isAuthenticated = false;
  }
  getUserInfo(): IAuthData {
    return this.userData;
  }
}
