import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { IAuthData, IUser } from '@app/shared';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducer';

// tslint:disable
@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.Login),
    map((action: { payload: IAuthData }) => action.payload),
    exhaustMap((authData: IAuthData) =>
      this.authService.login(authData).pipe(
        map(user => new AuthActions.LoginSuccess({ user })),
        catchError(error => of(new AuthActions.LoginFailure({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LoginSuccess),
    map((action: { payload: { user: IUser } }) => action.payload.user),
    tap<any>((user: IUser) => {
      localStorage.setItem('angularCoursesToken', user.token);
      this.router.navigate(['/courses']);
    })
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LoginFailure),
    map((action: { payload: { error: HttpErrorResponse } }) => action.payload.error.status),
    tap<any>((status: number) => {
      if (status === 401) {
        this.router.navigate(['/unauthorized']);
      } else {
        this.router.navigate(['/error']);
      }
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.Logout),
    tap<any>((status: number) => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions<AuthActions.AuthActionsUnion>,
    private authService: AuthService,
    private router: Router
  ) {}
}
