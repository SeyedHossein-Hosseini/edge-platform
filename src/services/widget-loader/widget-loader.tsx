import React from 'react';
import { Layouts } from 'react-grid-layout';
import { Dispatch } from 'redux';
import { ActivityList } from 'src/components/widgets/activity-list';
import { AreaChart } from 'src/components/widgets/area-chart';
import { BoardTable } from 'src/components/widgets/board-table';
import { CameraInformation } from 'src/components/widgets/camera-information';
import { HeatMapChart } from 'src/components/widgets/heatmap-chart';
import { MapWidget } from 'src/components/widgets/map';
import { MultiBarChart } from 'src/components/widgets/multi-bar-chart';
import { PeopleCounter } from 'src/components/widgets/people-counter';
import { PieChart } from 'src/components/widgets/pie-chart';
import { SingleBarChart } from 'src/components/widgets/single-bar-chart';
import { localStore } from 'src/helpers/storage-helper';
import actions from 'src/redux/actions';
import { MultipleRadialBarsChart } from 'src/components/widgets/multiple-radial-bars-chart';


interface RGLWidgetRemovingProps {
  dashboardName: string;
  setGridItems: (value: React.SetStateAction<React.ReactElement<any>[]>) => void;
  dispatch: Dispatch;
  removedWidgetId: string;
  setDefaultLayout: (value: React.SetStateAction<Layouts>) => void;
}

interface RGLWidgetInitProps {
  dashboardName: string;
  setGridItems: (value: React.SetStateAction<React.ReactElement<any>[]>) => void;
  setDefaultLayout: (value: React.SetStateAction<Layouts>) => void;
  initialWidget: {
    widget: string;
    props?: any;
  }[];
}

interface RGLWidgetAddingProps {
  dashboardName: string;
  setGridItems: (value: React.SetStateAction<React.ReactElement<any>[]>) => void;
  dispatch: Dispatch;
  widget: any;
}

export const WidgetLists = {
  activityList: ActivityList,
  peopleCounter: PeopleCounter,
  mapWidget: MapWidget,
  cameraInformation: CameraInformation,
  boardTable: BoardTable,
  heatMapChart: HeatMapChart,
  multiBarChart: MultiBarChart,
  singleBarChart: SingleBarChart,
  areaChart: AreaChart,
  pieChart: PieChart,
  multipleRadialBarsChart: MultipleRadialBarsChart,
};

const saveToLocalStore = (dashboardName: string, widget: keyof typeof WidgetLists, props: any, id: string) => {
  setTimeout(() => {
    const storeName = dashboardName;
    const prevStore = localStore.get(storeName) ?
      JSON.parse(localStore.get(storeName)) :
      [];

    const data = { widget, props, id };
    localStore.set(storeName, JSON.stringify([ ...prevStore, data ]));
  });
};

const getFromLocalStore = (dashboardName: string, widget: keyof typeof WidgetLists, id: string) => {
  const storeName = dashboardName;
  const prevStore = localStore.get(storeName) ?
    JSON.parse(localStore.get(storeName)) :
    [];

  const existItem = prevStore.filter(
      (item: any) => item.id === id && item.widget === widget
  )[0];

  return existItem;
};

export const removeFromLocalStore = (dashboardName: string, id: string) => {
  const storeName = dashboardName;
  let prevStore = localStore.get(storeName) ?
    JSON.parse(localStore.get(storeName)) :
    [];

  if (prevStore) {
    prevStore = prevStore.filter((item: any) => item.id !== id);
    localStore.set(dashboardName, JSON.stringify(prevStore));
  }
};

export const convertStorageToRGLConfig = (dashboardLayout: any) => {
  let dashboardWidgetsId: string[] = [];

  const config = dashboardLayout.reduce(
      (init: Layouts, w: any) => {
        Object.keys(w.config).forEach((item) => {
          Object.keys(w['config'][item]).map((bp) => {
            if (
              w['config'][item][bp] === 'Infinity' ||
            w['config'][item][bp] === 'null'
            ) {
              w['config'][item] = {
                ...w['config'][item],
                [bp]: Infinity,
              };
            }
          });
        });

        dashboardWidgetsId = [ ...dashboardWidgetsId, w.id ];
        return {
          lg: [ ...init.lg, w.config['lg'] ],
          md: [ ...init.md, w.config['md'] ],
          sm: [ ...init.sm, w.config['sm'] ],
          xs: [ ...init.xs, w.config['xs'] ],
          xxs: [ ...init.xxs, w.config['xxs'] ],
        };
      },
      { lg: [], md: [], sm: [], xs: [], xxs: [] }
  );

  return { idList: dashboardWidgetsId, config };
};

export const blockGenerator = (dashboardName: string, slug: keyof typeof WidgetLists, state: 'initial' | 'add' | string, props?: any) => {
  let newIndex: string;
  let itemProps: any;

  if (state === 'initial' || state === 'add') {
    newIndex = Math.random().toString();
    saveToLocalStore(
        dashboardName,
        slug,
        props || { title: undefined },
        newIndex
    );
  } else {
    itemProps = getFromLocalStore(dashboardName, slug, state as string);
  }

  const TagName = WidgetLists[slug];

  return (
    <TagName
      dashboardName={dashboardName}
      {...(itemProps ? { ...itemProps.props } : { ...props })}
      id={state === 'initial' || state === 'add' ? newIndex : itemProps.id}
      isAdded={state === 'add'}
    />
  );
};

export const handleRGLWidgetRemoving: (params: RGLWidgetRemovingProps) => void = ({
  dashboardName,
  setGridItems,
  dispatch,
  removedWidgetId,
  setDefaultLayout,
}) => {
  let dashboardWidgets = localStore.get(dashboardName) ?
    JSON.parse(localStore.get(dashboardName)) :
    undefined;

  if (!dashboardWidgets) {
    setGridItems([]);
    dispatch(actions.AppSetting.removeWidgetOfDashboard(undefined));
    return;
  }

  dashboardWidgets = dashboardWidgets.filter(
      (w: any) => w.id !== removedWidgetId
  );

  const { idList: dashboardWidgetsId, config } = convertStorageToRGLConfig(
      dashboardWidgets
  );

  removeFromLocalStore(dashboardName, removedWidgetId);
  setDefaultLayout(config);

  setGridItems(
      dashboardWidgets.map((item: any, index: number) =>
        blockGenerator(
            dashboardName,
        item.widget as keyof typeof WidgetLists,
        dashboardWidgetsId[index],
        item.props
        )
      )
  );

  dispatch(actions.AppSetting.removeWidgetOfDashboard(undefined));
};

export const handleRGLWidgetAdding: (params: RGLWidgetAddingProps) => void = ({
  dashboardName,
  setGridItems,
  dispatch,
  widget,
}) => {
  dispatch(actions.AppSetting.resetWidgetToDashboard());

  setGridItems((prevItems) => [
    ...prevItems,
    blockGenerator(dashboardName, widget.widget, 'add', widget.props),
  ]);
};

export const handleRGLInitWidgets: (params: RGLWidgetInitProps) => void = ({
  dashboardName,
  setGridItems,
  setDefaultLayout,
  initialWidget,
}) => {
  const dashboardExist = localStore.get(dashboardName) ? JSON.parse(localStore.get(dashboardName)) : undefined;
  const dashboardWidgets = dashboardExist || initialWidget;
  let dashboardWidgetsId: string[] = [];

  if (dashboardExist) {
    const { idList, config } = convertStorageToRGLConfig(dashboardExist);
    dashboardWidgetsId = idList;
    setDefaultLayout(config);
  }

  setGridItems(
      dashboardWidgets.map((item: any, index: number) => {
        return blockGenerator(
            dashboardName,
        item.widget as keyof typeof WidgetLists,
        dashboardExist ? dashboardWidgetsId[index] : 'initial',
        item.props,
        );
      })
  );
};
