// tslint:disable:typedef
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from 'src/app/core/auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}

export const selectAuthState = createFeatureSelector<fromAuth.State>('auth');

export const selectAuthAuthenticated = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.authenticated
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
);
