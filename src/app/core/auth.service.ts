import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { IAuthData } from '@app/shared';
import { BehaviorSubject } from 'rxjs';

const lsKey: string = 'ngCourses';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  userData: IAuthData;

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly router: Router) {}

  login(authData: IAuthData): void {
    this.userData = authData;
    localStorage.setItem(lsKey, JSON.stringify(authData));
    this.isAuthenticated.next(true);
    window.console.log('logged in successfully');

    this.router.navigate(['/courses']);
  }

  logout(): void {
    localStorage.removeItem(lsKey);
    this.userData = null;
    this.isAuthenticated.next(false);
    window.console.log('logout');

    this.router.navigate(['/']);
  }

  getUserInfo(): IAuthData {
    return this.userData;
  }
}
