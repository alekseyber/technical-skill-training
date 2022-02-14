import type { AuthDTO, UserAuth } from '@src/types/models';

export interface AuthState {
  user: UserAuth;
  token: AuthDTO;
  isLoading: boolean;
  errorAuth: string;
}

export enum AuthActionEnum {
  SET_ERROR = 'SET_ERROR_AUTH',
  SET_USER = 'SET_USER_AUTH',
  SET_IS_LOADING = 'SET_IS_LOADING_AUTH',
}

export interface SetErrorAction {
  type: AuthActionEnum.SET_ERROR;
  payload: string;
}
export interface SetUserAction {
  type: AuthActionEnum.SET_USER;
  payload: {
    user: UserAuth,
    token: AuthDTO,
  };
}
export interface SetIsLoadingAction {
  type: AuthActionEnum.SET_IS_LOADING;
  payload: boolean;
}

export type AuthAction = SetUserAction | SetErrorAction | SetIsLoadingAction;
