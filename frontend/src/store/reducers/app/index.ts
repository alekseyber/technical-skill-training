import { AppAction, AppActionEnum, AppState } from './types';

const initialState: AppState = {
  alert: {
    visible: false,
    severity: 'error',
    text: '',
    autoHideDuration: 2500,
  },
  publicSettings: {
    serviceName: '',
  },
};

export default function appReducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionEnum.SHOW_ALERT:
      return { ...state, alert: { ...action.payload, visible: true } };
    case AppActionEnum.HIDE_ALERT:
      return {
        ...state,
        alert: { ...state.alert, visible: false },
      };
    case AppActionEnum.SET_PUBLIC_SETTINGS:
      return {
        ...state,
        publicSettings: action.payload,
      };

    default:
      return state;
  }
}
