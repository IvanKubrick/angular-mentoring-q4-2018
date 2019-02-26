import { IUser } from '@app/shared';

import * as AuthActions from './auth.actions';

export interface State {
  user: IUser | null;
}

export const initialState: State = {
  user: null
};

export function reducer(state: State = initialState, action: AuthActions.AuthActionsUnion): State {
  switch (action.type) {
    case AuthActions.AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user
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

// tslint:disable-next-line:typedef
export const getUser = (state: State): IUser | null => state.user;
