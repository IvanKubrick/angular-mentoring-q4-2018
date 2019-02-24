import { Action } from '@ngrx/store';

export const TRY_SIGNUP: string = 'TRY_SIGNUP';
export const LOGIN: string = 'LOGIN';
export const LOGOUT: string = 'LOGOUT';
export const SET_TOKEN: string = 'SET_TOKEN';

export class TrySignup implements Action {
  readonly type: string = TRY_SIGNUP;

  constructor(public payload: { username: string; password: string }) {}
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

export type AuthActions = Login | Logout | SetToken | TrySignup;
