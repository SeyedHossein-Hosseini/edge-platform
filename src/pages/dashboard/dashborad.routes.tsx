import React, { lazy, LazyExoticComponent } from 'react';
import { IllustrationViewer } from 'src/components/static/illustration-viewer';

const MainPage = lazy(() => import('src/pages/dashboard/main'));
const Statistics = lazy(() => import('src/pages/dashboard/statistics'));
const BranchList = lazy(() => import('src/pages/dashboard/branch/branch-list'));
const BranchPage = lazy(() => import('src/pages/dashboard/branch/branch-page'));
const Activities = lazy(() => import('src/pages/dashboard/activities'));
const QrCode = lazy(() => import('src/pages/dashboard/qrcode'));
const Entrance = lazy(() => import('src/pages/dashboard/entrance'));
const EntranceHistory = lazy(() => import('src/pages/dashboard/entrance-history'));
const FloorPlan = lazy(() => import('src/pages/dashboard/floorplan'));
const Developers = lazy(() => import('src/pages/dashboard/developers'));
const Restricted = lazy(() => import('src/pages/dashboard/restricted'));
const RestrictedHistory = lazy(() => import('src/pages/dashboard/restricted-history'));
const RestrictedSettings = lazy(() => import('src/pages/dashboard/restricted-settings'));
const Users = lazy(() => import('src/pages/dashboard/users'));
const AddUser = lazy(() => import('src/pages/dashboard/add-user-new'));
const licensePlate = lazy(() => import('src/pages/dashboard/license-plate'));
const licensePlateHistory = lazy(() => import('src/pages/dashboard/license-plate-history'));
const camerasList = lazy(() => import('src/pages/dashboard/cameras'));
const boardsList = lazy(() => import('src/pages/dashboard/boards'));

export enum RouteName {
  BRANCH_LIST = 'branch-list',
  BRANCH = `branch-list/:id`,
  SERVICE_LIST = 'services',
  SERVICE = 'services/:id?',
  STATISTICS = 'statistics',
  ACTIVITIES = 'activities',
  RESTRICTED = 'restricted',
  RESTRICTED_HISTORY = 'restricted/history',
  RESTRICTED_CONFIG = 'restricted/config',
  SUPPORT = 'support',
  QR_CODE = 'qrcode',
  ENTRANCE = 'entrance',
  ENTRANCE_HISTORY = 'entrance/history',
  FLOOR_PLAN = 'floor-plan',
  DEVELOPERS = 'developers',
  USERS = 'users',
  ADD_USER = 'users/add',
  USER = 'user/:id',
  MAIN = 'dashboard',
  LICENSE_PLATE = 'license-plate',
  LICENSE_PLATE_HISTORY = 'license-plate/history',
  CAMERA_LIST = 'infrastructure/cameras',
  BOARDS_LIST = 'infrastructure/boards',
}

export interface RouteProps {
  path: RouteName;
  exact: boolean;
  routeTitle?: string,
  component: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
}

export const routes: RouteProps[] = [
  {
    path: RouteName.BRANCH_LIST,
    component: BranchList,
    exact: true,
  },
  {
    path: RouteName.BRANCH,
    component: BranchPage,
    exact: true,
  },
  {
    path: RouteName.SERVICE,
    component: () => (
      <IllustrationViewer illustration={'comingSoon.svg'} title={'general.comingSoon'} />
    ),
    exact: true,
  },
  {
    path: RouteName.STATISTICS,
    component: Statistics,
    exact: true,
  },
  {
    path: RouteName.ACTIVITIES,
    component: () => (
      <IllustrationViewer illustration={'comingSoon.svg'} title={'general.comingSoon'} />
    ),
    exact: true,
  },
  {
    path: RouteName.RESTRICTED,
    component: Restricted,
    routeTitle: 'restricted',
    exact: true,
  },
  {
    path: RouteName.RESTRICTED_HISTORY,
    component: RestrictedHistory,
    routeTitle: 'restrictedHistory',
    exact: true,
  },
  {
    path: RouteName.RESTRICTED_CONFIG,
    component: RestrictedSettings,
    routeTitle: 'restrictedConfig',
    exact: true,
  },
  {
    path: RouteName.SUPPORT,
    component: () => (
      <IllustrationViewer illustration={'comingSoon.svg'} title={'general.comingSoon'} />
    ),
    exact: true,
  },
  {
    path: RouteName.QR_CODE,
    component: QrCode,
    exact: true,
  },
  {
    path: RouteName.ENTRANCE,
    component: Entrance,
    routeTitle: 'faceRec',
    exact: true,
  },
  {
    path: RouteName.ENTRANCE_HISTORY,
    component: EntranceHistory,
    routeTitle: 'faceRecHistory',
    exact: true,
  },
  {
    path: RouteName.FLOOR_PLAN,
    component: FloorPlan,
    exact: true,
  },
  {
    path: RouteName.DEVELOPERS,
    component: () => (
      <IllustrationViewer illustration={'comingSoon.svg'} title={'general.comingSoon'} />
    ),
    exact: true,
  },
  {
    path: RouteName.MAIN,
    component: MainPage,
    routeTitle: 'dashboard',
    exact: true,
  },
  {
    path: RouteName.USERS,
    component: Users,
    routeTitle: 'employees',
    exact: true,
  },
  {
    path: RouteName.USER,
    component: AddUser,
    routeTitle: 'profile',
    exact: true,
  },
  {
    path: RouteName.ADD_USER,
    component: AddUser,
    routeTitle: 'addUser',
    exact: true,
  },
  {
    path: RouteName.LICENSE_PLATE,
    component: licensePlate,
    routeTitle: 'licensePlate',
    exact: true,
  },
  {
    path: RouteName.LICENSE_PLATE_HISTORY,
    component: licensePlateHistory,
    routeTitle: 'licensePlateHistory',
    exact: true,
  },
  {
    path: RouteName.CAMERA_LIST,
    component: camerasList,
    routeTitle: 'camerasList',
    exact: true,
  },
  {
    path: RouteName.BOARDS_LIST,
    component: boardsList,
    routeTitle: 'boardsList',
    exact: true,
  },
];
