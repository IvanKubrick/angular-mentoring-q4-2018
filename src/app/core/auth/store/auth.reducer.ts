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
export function reducer(state: State = initialState, action): State {
  switch (action.type) {
    case AuthActions.AuthActionTypes.Login: {
      return {
        ...state
      };
    }

    case AuthActions.AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user,
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
