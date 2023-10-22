import { Typography } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { Layouts } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveGrid from 'src/components/share/card-widget/responsive-grid';
import { AppState } from 'src/redux/store';
import {
  handleRGLInitWidgets,
  handleRGLWidgetAdding,
  handleRGLWidgetRemoving,
} from 'src/services/widget-loader';


const Activities = () => {
  const dashboardName = 'activities';
  const dashboardNameLs = dashboardName + '-dashboard';

  const dispatch = useDispatch();
  const [ gridItems, setGridItems ] = useState<ReactElement[]>([]);
  const [ defaultLayout, setDefaultLayout ] = useState<Layouts>();

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
    const initialWidget = [
      { widget: 'peopleCounter' },
      { widget: 'activityList' },
      { widget: 'peopleCounter' },
    ];

    handleRGLInitWidgets({
      dashboardName: dashboardNameLs,
      setGridItems,
      setDefaultLayout,
      initialWidget,
    });
  }, []);

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

  return (
    <>
      <Typography variant="h1" gutterBottom>
        Activities
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

export default Activities;
