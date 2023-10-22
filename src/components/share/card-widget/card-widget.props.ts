import { IMenuItem } from 'src/components/share/menu-popper/menu-popper.interface';

interface GridConfigProps {
  x?: number;
  y?: number;
  w: number;
  h: number;
  minW: number;
  minH: number;
}

export interface CardWidgetProps {
  id?: string;
  slug?: string;
  title?: string;
  height?: number;
  isAdded?: boolean;
  setTitle?: (value: string) => void;
  setFullHeight?: (value: boolean) => void;
  setMenuItems?: (value: IMenuItem[]) => void;
  dashboardName?: string;
}

export interface ConfigProps {
  centerContent?: boolean;
  id?: string;
  breakPoints?: {
    lg: GridConfigProps;
    md: GridConfigProps;
    sm: GridConfigProps;
    xs: GridConfigProps;
    xxs: GridConfigProps;
  };
}
