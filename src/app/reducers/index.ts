import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as AuthActions from '../core/auth/store/auth.actions';
import * as fromAuth from '../core/auth/store/auth.reducer';

export interface State {
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
