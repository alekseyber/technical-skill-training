import { AuthActionEnum, SetErrorAction, SetIsLoadingAction, SetUserAction } from './types';
import { UserAuth, UserCandidateDTO, AuthDTO, TypeNameEnum } from '@src/types/models';
import { AppDispatch } from '@src/store/index';
import { removeLocalStorage, setObjectLocalStorage } from '@src/utils/localStorageUtil';
import { getJWTDecode } from '@src/utils/jwtDecodeUtil';
import { HttpClient, RESTAPIMetodsEnum } from '@src/api/HttpClient';
import { getErrorFetchApp } from '@src/utils/getErrorFetchApp';
import { ProgTestsActionCreators } from '../progTests/action-creators';

export const AuthActionCreators = {
  setUser: (user: UserAuth, token: AuthDTO): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: { user, token },
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  setLogin: (data: AuthDTO): SetUserAction => {
    const userAuth = getJWTDecode<UserAuth>(data?.access_token);

    if (!userAuth) throw new Error('Неверный формат токена');

    setObjectLocalStorage('user', userAuth);
    setObjectLocalStorage('token', data);

    return {
      type: AuthActionEnum.SET_USER,
      payload: { user: userAuth, token: data },
    };
  },
  login: (userCandidate: UserCandidateDTO) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));

      const { data } = await HttpClient.getAppAPI<AuthDTO, UserCandidateDTO>(
        TypeNameEnum.LOGIN,
        userCandidate,
        RESTAPIMetodsEnum.POST
      );

      dispatch(AuthActionCreators.setLogin(data));
    } catch (e) {
      const error = getErrorFetchApp(e);

      dispatch(AuthActionCreators.setError(error.response?.data.message || error.message));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    removeLocalStorage('user');
    removeLocalStorage('token');
    dispatch(AuthActionCreators.setUser(<UserAuth>{}, <AuthDTO>{}));
    dispatch(ProgTestsActionCreators.resetExpiresProgTest());
  },
};
