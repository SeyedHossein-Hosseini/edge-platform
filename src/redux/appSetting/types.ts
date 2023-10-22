import { WidgetLists } from 'src/services/widget-loader';
import { AlertProps } from '@material-ui/lab/Alert';
import { CameraInfoProps } from 'src/entities/board-data.interface';

export const SET_IS_IDLE = 'SET_IS_IDLE';
export const SET_LOADING = 'SET_LOADING';
export const SET_DRAWER = 'SET_DRAWER';
export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_TOAST = 'SET_TOAST';
export const SET_LOCALE = 'SET_LOCALE';
export const ADD_WIDGET_TO_DASHBOARD = 'ADD_WIDGET_TO_DASHBOARD';
export const SET_IS_WIDGET_REMOVED_FROM_DASHBOARD =
  'SET_IS_WIDGET_REMOVED_FROM_DASHBOARD';
export const REMOVE_WIDGET_OF_DASHBOARD = 'REMOVE_WIDGET_OF_DASHBOARD';
export const RESET_WIDGET_TO_DASHBOARD = 'RESET_WIDGET_TO_DASHBOARD';
export const SET_ACTIVE_CAMERA_INFO = 'SET_ACTIVE_CAMERA_INFO';

export interface WidgetProps {
  widget: keyof typeof WidgetLists;
  props: {
    title: string;
  };
}
export interface IAppSettingState {
  loading: boolean;
  isIdle: boolean;
  drawer: boolean;
  direction: 'rtl' | 'ltr';
  locale: 'fa' | 'en';
  toast: {
    message: string;
    severity?: AlertProps['severity'];
    horizontal?: 'center' | 'left' | 'right';
    vertical?: 'top' | 'bottom';
    autoHideDuration?: number;
    action?: {
      label: string;
      fn: () => void;
    };
  };
  widget: WidgetProps;
  removedWidgetId: string;
  activeCameraInfo: CameraInfoProps[];
}

interface ISetIsIdle {
  type: typeof SET_IS_IDLE;
  isIdle: IAppSettingState['isIdle'];
}

interface ISetLoading {
  type: typeof SET_LOADING;
  loading: IAppSettingState['loading'];
}

interface ISetDrawer {
  type: typeof SET_DRAWER;
  drawer: IAppSettingState['drawer'];
}

interface ISetDirection {
  type: typeof SET_DIRECTION;
  direction: IAppSettingState['direction'];
}

interface SetToast {
  type: typeof SET_TOAST;
  toast: IAppSettingState['toast'];
}

interface AddWidgetToDashboard {
  type: typeof ADD_WIDGET_TO_DASHBOARD;
  widget: WidgetProps;
}

interface RemoveWidgetOfDashboard {
  type: typeof REMOVE_WIDGET_OF_DASHBOARD;
  removedWidgetId: IAppSettingState['removedWidgetId'];
}

interface ResetWidgetToDashboard {
  type: typeof RESET_WIDGET_TO_DASHBOARD;
}

interface SetActiveCameraInfo {
  type: typeof SET_ACTIVE_CAMERA_INFO;
  cameraInfo: CameraInfoProps[];
}

interface SetLocale {
  type: typeof SET_LOCALE;
  locale: IAppSettingState['locale'];
}

export interface IAppSettingActions {
  setIsIdle: (isIdle: IAppSettingState['isIdle']) => ISetIsIdle;
  setLoading: (loading: IAppSettingState['loading']) => ISetLoading;
  setDrawer: (drawer: IAppSettingState['drawer']) => ISetDrawer;
  setDirection: (direction: IAppSettingState['direction']) => ISetDirection;
  setToast: (toast: IAppSettingState['toast']) => SetToast;
  addWidgetToDashboard: (widget: WidgetProps) => AddWidgetToDashboard;
  removeWidgetOfDashboard: (
    removedWidgetId: IAppSettingState['removedWidgetId']
  ) => RemoveWidgetOfDashboard;
  resetWidgetToDashboard: () => ResetWidgetToDashboard;
  setActiveCameraInfo: (
    info: IAppSettingState['activeCameraInfo']
  ) => SetActiveCameraInfo;
  setLocale: (locale: IAppSettingState['locale']) => SetLocale;
}

export type AppSettingActionTypes =
  | ISetIsIdle
  | ISetLoading
  | ISetDrawer
  | ISetDirection
  | SetToast
  | AddWidgetToDashboard
  | RemoveWidgetOfDashboard
  | ResetWidgetToDashboard
  | SetActiveCameraInfo
  | SetLocale;
