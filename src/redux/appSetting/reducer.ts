import { localStore } from 'src/helpers/storage-helper';
import { environment } from '../../../environments/environment';
import {
  ADD_WIDGET_TO_DASHBOARD,
  AppSettingActionTypes,
  IAppSettingState,
  RESET_WIDGET_TO_DASHBOARD,
  SET_ACTIVE_CAMERA_INFO,
  SET_DIRECTION,
  SET_DRAWER,
  SET_IS_IDLE,
  REMOVE_WIDGET_OF_DASHBOARD,
  SET_LOADING,
  SET_LOCALE,
  SET_TOAST,
} from './types';

const initialState: IAppSettingState = {
  loading: false,
  isIdle: false,
  drawer: false,
  direction: (localStore.get('direction') as IAppSettingState['direction']) || environment.initialLang.dir as IAppSettingState['direction'],
  toast: {
    message: '',
    severity: 'info',
    horizontal: 'center',
    vertical: 'top',
    autoHideDuration: 0,
    action: undefined,
  },
  widget: undefined,
  removedWidgetId: undefined,
  activeCameraInfo: undefined,
  locale: (localStore.get('lng') as IAppSettingState['locale']) || environment.initialLang.lng as IAppSettingState['locale'],
};

const appSettingReducer = (
    state = initialState,
    action: AppSettingActionTypes
) => {
  switch (action.type) {
    case SET_IS_IDLE:
      return {
        ...state,
        isIdle: action.isIdle,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case SET_DRAWER:
      return {
        ...state,
        drawer: action.drawer,
      };
    case SET_DIRECTION:
      localStore.set('direction', action.direction);
      return {
        ...state,
        direction: action.direction,
      };
    case SET_TOAST:
      return {
        ...state,
        toast: {
          ...action.toast,
          autoHideDuration:
            action.toast.autoHideDuration >= 0 ?
              action.toast.autoHideDuration :
              5000,
        },
      };
    case ADD_WIDGET_TO_DASHBOARD:
      return {
        ...state,
        widget: action.widget,
      };
    case REMOVE_WIDGET_OF_DASHBOARD:
      return {
        ...state,
        removedWidgetId: action.removedWidgetId,
      };
    case RESET_WIDGET_TO_DASHBOARD:
      return {
        ...state,
        widget: undefined,
      };
    case SET_ACTIVE_CAMERA_INFO:
      return {
        ...state,
        activeCameraInfo: action.cameraInfo,
      };
    case SET_LOCALE:
      localStore.set('lng', action.locale);
      return {
        ...state,
        locale: action.locale,
      };
    default:
      return state;
  }
};

export default appSettingReducer;
