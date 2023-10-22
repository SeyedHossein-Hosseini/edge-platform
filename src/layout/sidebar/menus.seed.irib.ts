import {
  DirectionsCar, DirectionsWalk, PeopleAlt, RemoveCircle,
} from '@material-ui/icons';
import { RouteName } from 'src/pages/dashboard/dashborad.routes';
import { IMenuItem } from './menus.interface';

export const menus: IMenuItem[] = [
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
];
