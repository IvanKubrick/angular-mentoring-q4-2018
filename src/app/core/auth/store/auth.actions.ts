import { IUserInfo } from './../../../userInfo.model';
import { Action } from '@ngrx/store';

import { IAuthData, IUser } from '@app/shared';

export enum AuthActionTypes {
  TryToLogin = '[Auth] Try to login',
  TryToLoginSuccess = '[Auth] Try to login: Success',
  TryToLoginFailure = '[Auth] Try to login: Failure',

  Login = '[Login Page] Login',
  Logout = '[Auth] Logout',
  LogoutConfirmation = '[Auth] Logout Confirmation',
  LogoutConfirmationDismiss = '[Auth] Logout Confirmation Dismiss',
  LoginSuccess = '[Auth/API] Login Success',
  LoginFailure = '[Auth/API] Login Failure',
  LoginRedirect = '[Auth/API] Login Redirect'
}

export class TryToLogin implements Action {
  readonly type: string = AuthActionTypes.TryToLogin;
}
export class TryToLoginSuccess implements Action {
  readonly type: string = AuthActionTypes.TryToLoginSuccess;

  constructor(public payload: { user: IUser }) {}
}
export class TryToLoginFailure implements Action {
  readonly type: string = AuthActionTypes.TryToLoginFailure;
}

export class Login implements Action {
  readonly type: string = AuthActionTypes.Login;

  constructor(public payload: { authData: IAuthData }) {}
}

export class Logout implements Action {
  readonly type: string = AuthActionTypes.Logout;
}

export class LogoutConfirmation implements Action {
  readonly type: string = AuthActionTypes.LogoutConfirmation;
}

export class LogoutConfirmationDismiss implements Action {
  readonly type: string = AuthActionTypes.LogoutConfirmationDismiss;
}

export class LoginSuccess implements Action {
  readonly type: string = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: IUser }) {}
}

export class LoginFailure implements Action {
  readonly type: string = AuthActionTypes.LoginFailure;

  constructor(public payload: { error: any }) {}
}

export class LoginRedirect implements Action {
  readonly type: string = AuthActionTypes.LoginRedirect;
}

export type AuthActionsUnion =
  | Logout
  | LogoutConfirmation
  | LogoutConfirmationDismiss
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | TryToLogin
  | TryToLoginSuccess
  | TryToLoginFailure;
