import { IUser } from '@app/shared';

import * as AuthActions from './auth.actions';

export interface State {
  user: IUser | null;
  authenticated: boolean;
}

export const initialState: State = {
  user: null,
  authenticated: false
};

// tslint:disable:typedef
export function reducer(state: State = initialState, action: AuthActions.AuthActionsUnion): State {
  switch (action.type) {
    case AuthActions.AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: (<AuthActions.LoginSuccess>action).payload.user,
        authenticated: true
      };
    }

    case AuthActions.AuthActionTypes.LoginFailure: {
      return {
        ...state,
        user: null,
        authenticated: false
      };
    }

    case AuthActions.AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State): IUser | null => state.user;
