import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { AuthService } from '@app/core';
import { IUser } from '@app/shared';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.TRY_LOGIN),
    map((action: AuthActions.TryLogin) => action.payload),
    switchMap(
      (authData: { login: string; password: string }): IUser => {
        this.authService.login(authData);
      }
    ),
    mergeMap((token: string) => {
      return [
        {
          type: AuthActions.LOGIN
        },
        {
          type: AuthActions.SET_TOKEN(),
          payload: token
        }
      ];
    })
  );

  constructor(private actions$: Actions, private readonly authService: AuthService) {}
}
