import * as fromAuth from './core/auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}
