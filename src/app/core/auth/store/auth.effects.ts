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
    map((action: { payload: IUser }) => {
      action.payload;
    }),
    tap<any>((user: IUser) => {
      if (!user) {
        return;
      }
      debugger;
      localStorage.setItem('angularCoursesToken', user.token);
      this.router.navigate(['/courses']);
    })
  );

  constructor(
    private actions$: Actions<AuthActions.AuthActionsUnion>,
    private authService: AuthService,
    private router: Router
  ) {}
}
