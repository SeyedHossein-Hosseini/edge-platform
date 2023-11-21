import { RouteName } from 'src/pages/dashboard/dashborad.routes';
import { IMenuItem } from './menus.interface';
import {
  AspectRatio,
  ContactSupport,
  CropFree,
  Dashboard,
  Description,
  Equalizer,
  Gesture,
  PeopleAlt,
  StoreMallDirectory,
  Explore,
  DeveloperMode,
  DirectionsWalk,
  DirectionsCar,
  RemoveCircle,
  Dns,
} from '@material-ui/icons';

export const menus: IMenuItem[] = [
  {
    label: 'sidebar.dashboard',
    icon: Dashboard,
    path: RouteName.MAIN,
  },
  {
    label: 'sidebar.users',
    icon: PeopleAlt,
    path: RouteName.USERS,
  },
  {
    label: 'sidebar.restricted',
    icon: RemoveCircle,
    path: RouteName.RESTRICTED,
    submenus: [
      {
        label: 'sidebar.online',
        path: `${RouteName.RESTRICTED}`,
      },
      {
        label: 'sidebar.history',
        path: `${RouteName.RESTRICTED_HISTORY}`,
      },
      {
        label: 'sidebar.config',
        path: `${RouteName.RESTRICTED_CONFIG}`,
      },
    ],
  },
  {
    label: 'sidebar.entrance',
    icon: DirectionsWalk,
    path: RouteName.ENTRANCE,
    submenus: [
      {
        label: 'sidebar.online',
        path: `${RouteName.ENTRANCE}`,
      },
      {
        label: 'sidebar.history',
        path: `${RouteName.ENTRANCE_HISTORY}`,
      },
    ],
  },
  {
    label: 'sidebar.licensePlate',
    icon: DirectionsCar,
    path: RouteName.LICENSE_PLATE,
    submenus: [
      {
        label: 'sidebar.online',
        path: `${RouteName.LICENSE_PLATE}`,
      },
      {
        label: 'sidebar.history',
        path: `${RouteName.LICENSE_PLATE_HISTORY}`,
      },
    ],
  },
  {
    label: 'sidebar.infrastructure',
    icon: Dns,
    path: RouteName.CAMERA_LIST,
    submenus: [
      {
        label: 'sidebar.cameraList',
        path: `${RouteName.CAMERA_LIST}`,
      },
      {
        label: 'sidebar.boardsList',
        path: `${RouteName.BOARDS_LIST}`,
      },
    ],
  },
  {
    label: 'sidebar.branchList',
    icon: StoreMallDirectory,
    path: RouteName.BRANCH_LIST,
  },
  {
    label: 'sidebar.ourServices',
    icon: AspectRatio,
    path: RouteName.SERVICE_LIST,
  },
  {
    label: 'sidebar.statistics',
    icon: Equalizer,
    path: RouteName.STATISTICS,
  },
  {
    label: 'sidebar.activities',
    icon: Description,
    path: RouteName.ACTIVITIES,
  },
  {
    label: 'sidebar.support',
    icon: ContactSupport,
    path: RouteName.SUPPORT,
  },
  {
    label: 'sidebar.qrCode',
    icon: CropFree,
    path: RouteName.QR_CODE,
  },
  {
    label: 'sidebar.floorplan',
    icon: Explore,
    path: RouteName.FLOOR_PLAN,
  },
  {
    label: 'sidebar.developers',
    icon: DeveloperMode,
    path: RouteName.DEVELOPERS,
  },
];
