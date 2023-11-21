import momentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { ReactElement, useEffect, useState } from 'react';
import { Layouts } from 'react-grid-layout';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveGrid from 'src/components/share/card-widget/responsive-grid';
import { AppState } from 'src/redux/store';
import {
  handleRGLInitWidgets,
  handleRGLWidgetAdding,
  handleRGLWidgetRemoving,
} from 'src/services/widget-loader/widget-loader';

const Statistics = () => {
  const dashboardName = 'statistics';
  const dashboardNameLs = dashboardName + '-dashboard';
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
      { widget: 'heatMapChart' },
      { widget: 'multiBarChart' },
      { widget: 'singleBarChart' },
      { widget: 'areaChart' },
      { widget: 'pieChart' },
      { widget: 'multipleRadialBarsChart' },
    ];

    handleRGLInitWidgets({
      dashboardName: dashboardNameLs,
      setGridItems,
      setDefaultLayout,
      initialWidget,
    });
  }, []);

  return (
    <MuiPickersUtilsProvider utils={momentUtils}>
      <ResponsiveGrid
        children={gridItems}
        dashboardName={dashboardName}
        defaultLayout={defaultLayout}
        removedItem={!!removedWidgetId}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Statistics;
