import * as AuthActions from './auth.actions';

import { IUser } from '@app/shared';

export interface IState {
  token: string;
  authenticated: boolean;
  user: IUser;
}

const initialState: IState = {
  token: null,
  authenticated: false,
  user: null
};

export function authReducer(state: IState = initialState, action: AuthActions.AuthActions): IState {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: null,
        authenticated: false,
        user: null
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state
        // token: action.payload
      };
    default:
      return state;
  }
}
