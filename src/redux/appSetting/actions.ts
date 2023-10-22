import {
  SET_DRAWER,
  SET_LOADING,
  SET_TOAST,
  SET_DIRECTION,
  ADD_WIDGET_TO_DASHBOARD,
  RESET_WIDGET_TO_DASHBOARD,
  REMOVE_WIDGET_OF_DASHBOARD,
  SET_IS_IDLE,
  SET_ACTIVE_CAMERA_INFO,
  SET_LOCALE,
  IAppSettingActions,
} from './types';

const actions: IAppSettingActions = {
  setIsIdle: (isIdle) => ({
    type: SET_IS_IDLE,
    isIdle,
  }),
  setLoading: (loading) => ({
    type: SET_LOADING,
    loading,
  }),
  setDrawer: (drawer) => ({
    type: SET_DRAWER,
    drawer,
  }),
  setDirection: (direction) => ({
    type: SET_DIRECTION,
    direction,
  }),
  setToast: (toast) => ({
    type: SET_TOAST,
    toast,
  }),
  addWidgetToDashboard: (widget) => ({
    type: ADD_WIDGET_TO_DASHBOARD,
    widget,
  }),
  removeWidgetOfDashboard: (removedWidgetId) => ({
    type: REMOVE_WIDGET_OF_DASHBOARD,
    removedWidgetId,
  }),
  resetWidgetToDashboard: () => ({
    type: RESET_WIDGET_TO_DASHBOARD,
  }),
  setActiveCameraInfo: (cameraInfo) => ({
    type: SET_ACTIVE_CAMERA_INFO,
    cameraInfo,
  }),
  setLocale: (locale) => ({
    type: SET_LOCALE,
    locale,
  }),
};

export default actions;
