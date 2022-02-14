import { PublicSettingsDTO } from '@src/types/models';

export interface AppState {
  alert: {
    visible: boolean;
    severity: 'error' | 'info' | 'success' | 'warning';
    text: string;
    autoHideDuration: number;
  };
  publicSettings: PublicSettingsDTO;
}

export enum AppActionEnum {
  SHOW_ALERT = 'SHOW_ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
  SET_PUBLIC_SETTINGS = 'SET_PUBLIC_SETTINGS',
}

export type Severity = 'error' | 'info' | 'success' | 'warning';

export interface ShowAlertActionProps {
  severity: Severity;
  text: string;
  autoHideDuration: number;
}

export interface ShowAlertAction {
  type: AppActionEnum.SHOW_ALERT;
  payload: ShowAlertActionProps;
}

export interface HideAlertAction {
  type: AppActionEnum.HIDE_ALERT;
}

export interface SetPublicSettingsAction {
  type: AppActionEnum.SET_PUBLIC_SETTINGS;
  payload: PublicSettingsDTO;
}

export type AppAction = ShowAlertAction | HideAlertAction | SetPublicSettingsAction;
