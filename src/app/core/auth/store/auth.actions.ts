import { Action } from '@ngrx/store';

export const TRY_LOGIN: string = 'TRY_LOGIN';
export const LOGIN: string = 'LOGIN';
export const LOGOUT: string = 'LOGOUT';
export const SET_TOKEN: string = 'SET_TOKEN';

export class TryLogin implements Action {
  readonly type: string = TRY_LOGIN;

  constructor(public payload: { login: string; password: string }) {}
}
export class Login implements Action {
  readonly type: string = LOGIN;
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
}
export class SetToken implements Action {
  readonly type: string = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = Login | Logout | SetToken | TryLogin;
