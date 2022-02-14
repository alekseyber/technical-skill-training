import {
  AppActionEnum,
  ShowAlertAction,
  ShowAlertActionProps,
  HideAlertAction,
  Severity,
  SetPublicSettingsAction,
} from './types';

import { AppDispatch } from '@src/store/index';
import { PublicSettingsDTO, TypeNameEnum } from '@src/types/models';
import { HttpClient } from '@src/api/HttpClient';

export const AppActionCreators = {
  setShowAlert: (payload: ShowAlertActionProps): ShowAlertAction => ({
    type: AppActionEnum.SHOW_ALERT,
    payload,
  }),
  setHideAlert: (): HideAlertAction => ({
    type: AppActionEnum.HIDE_ALERT,
  }),
  setPublicSettings: (payload: PublicSettingsDTO): SetPublicSettingsAction => ({
    type: AppActionEnum.SET_PUBLIC_SETTINGS,
    payload,
  }),
  loadPublicSettings: () => async (dispatch: AppDispatch) => {
    try {
      const { data } = await HttpClient.getAppAPI<PublicSettingsDTO>(TypeNameEnum.PUBLIC_SETTINGS);

      dispatch(AppActionCreators.setPublicSettings(data));
    } catch (e) {
      console.log(e);
    }
  },
  showAlert:
    (
      text: string,
      severity: Severity = 'error',

      autoHideDuration = 2500
    ) =>
    (dispatch: AppDispatch) => {
      dispatch(
        AppActionCreators.setShowAlert({
          text,
          severity,
          autoHideDuration,
        })
      );
    },
  hideAlert: () => (dispatch: AppDispatch) => {
    dispatch(AppActionCreators.setHideAlert());
  },
};
