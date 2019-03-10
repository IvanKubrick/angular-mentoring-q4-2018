import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IAuthData, IUser, User } from '@app/shared';
import { Observable } from 'rxjs';
import { IUserInfo } from 'src/app/userInfo.model';

// tslint:disable-next-line: no-unsafe-any
@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(authData: IAuthData): Observable<IUser> {
    const url: string = 'http://localhost:3004/auth/login';

    return this.http.post<IUser>(url, { login: authData.login, password: authData.password });
  }

  getUserInfo(token: string): Observable<IUserInfo> {
    const url: string = 'http://localhost:3004/auth/userinfo';

    return this.http.post<IUserInfo>(url, null);
  }

  getToken(): string | null {
    return localStorage.getItem('angularCoursesToken');
  }

  saveToken(token: string): void {
    localStorage.setItem('angularCoursesToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('angularCoursesToken');
  }
}
