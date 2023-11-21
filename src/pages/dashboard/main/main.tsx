import { Typography } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { Layouts } from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveGrid from 'src/components/share/card-widget/responsive-grid';
import { AppState } from 'src/redux/store';
import {
  handleRGLInitWidgets,
  handleRGLWidgetAdding,
  handleRGLWidgetRemoving,
} from 'src/services/widget-loader';


const Main = () => {
  const dashboardName = 'mainPage';
  const dashboardNameLs = dashboardName + '-dashboard';

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [ defaultLayout, setDefaultLayout ] = useState<Layouts>();
  const [ gridItems, setGridItems ] = useState<ReactElement[]>([]);

  const { widget } = useSelector((state: AppState) => state.AppSetting);
  const { removedWidgetId } = useSelector((state: AppState) => {
    return { removedWidgetId: state.AppSetting.removedWidgetId };
  });

  useEffect(() => {
    if (!widget) return;
    handleRGLWidgetAdding({
      dashboardName: dashboardNameLs,
      setGridItems,
      dispatch,
      widget,
    });
  }, [widget]);

  useEffect(() => {
    if (!removedWidgetId) return;

    handleRGLWidgetRemoving({
      dashboardName: dashboardNameLs,
      setGridItems,
      dispatch,
      removedWidgetId,
      setDefaultLayout,
    });
  }, [removedWidgetId]);

  useEffect(() => {
    const initialWidget = [
      { widget: 'peopleCounter' },
      { widget: 'activityList' },
      { widget: 'cameraInformation' },
      { widget: 'boardTable' },
      { widget: 'mapWidget' },
      { widget: 'heatMapChart' },
      { widget: 'multiBarChart' },
      { widget: 'singleBarChart' },
      { widget: 'areaChart' },
    ];

    handleRGLInitWidgets({
      dashboardName: dashboardNameLs,
      setGridItems,
      setDefaultLayout,
      initialWidget,
    });
  }, []);

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Overview
      </Typography>

      <ResponsiveGrid
        children={gridItems}
        dashboardName={dashboardName}
        defaultLayout={defaultLayout}
        removedItem={!!removedWidgetId}
      />
    </>
  );
};

export default Main;
