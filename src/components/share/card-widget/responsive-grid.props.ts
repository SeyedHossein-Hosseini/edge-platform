import { ReactElement } from 'react';
import { Layouts } from 'react-grid-layout';

export interface ResponsiveGridProps {
  dashboardName: string;
  size?: { width: number };
  children: ReactElement[];
  defaultLayout?: Layouts;
  removedItem?: boolean;
}
