import { inject, TestBed } from '@angular/core/testing';
import { isObservable } from 'rxjs';

import { IAuthData, IUser, User } from '@app/shared';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return isAuthenticated value', inject([AuthService], (service: AuthService) => {
    service.isAuthenticated.subscribe((value: boolean) => {
      return expect(value).toBeFalsy();
    });
  }));

  it('should return isAuthenticated as Observable', inject([AuthService], (service: AuthService) => {
    expect(isObservable(service.isAuthenticated)).toBeTruthy();
  }));

  it('should return User instance on login', inject([AuthService], (service: AuthService) => {
    const userDataStub: IAuthData = {
      email: 'test@gmail.com',
      password: 'password123'
    };

    service.login(userDataStub).subscribe((value: IUser) => {
      return expect(value instanceof User).toBeTruthy();
    });
  }));

  it('should return User instance on logout', inject([AuthService], (service: AuthService) => {
    service.logout().subscribe((value: IUser) => {
      return expect(value instanceof User).toBeTruthy();
    });
  }));

  it('should return User instance on getUserInfo', inject([AuthService], (service: AuthService) => {
    service.getUserInfo().subscribe((value: IUser) => {
      return expect(value instanceof User).toBeTruthy();
    });
  }));
});
