import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../core/auth/store/auth.reducers';

export interface IAppState {
  auth: fromAuth.IState;
}

export const reducers: ActionReducerMap<IAppState> = {
  auth: fromAuth.authReducer
};
