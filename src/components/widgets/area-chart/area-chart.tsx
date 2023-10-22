import { Box } from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'src/components/share/card-widget';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { useStyle } from './area-chart.style';
import { licensePlateTimeDurationInDay } from 'src/services/api/statistics.api';

export interface SingleBarChartProps extends CardWidgetProps { }

const AreaChart: React.FC<SingleBarChartProps> = ({
  height,
  title,
  setTitle,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ chartHeight, setChatHeight ] = useState(350);
  const [ chartCategories, setChartCategories ] = useState<any>([]);
  const [ chartSeries, setChartSeries ] = useState<any>([]);

  useEffect(() => {
    setTitle(!title ? 'charts.areaBarChart' : title);
    setFullHeight(true);
  }, []);

  useEffect(() => {
    if (height) {
      setChatHeight(height - 24);
    } else {
      setChatHeight(350);
    }
  }, [height]);

  useEffect(() => {
    licensePlateTimeDurationInDay().subscribe((res: any) => {
      if ( res['isOk'] ) {
        const re: RegExp = /:00/gi;
        setChartCategories( res['data'].map((item: any) => item['time_range'].replace(re, '') ) );
        setChartSeries([{
          name: 'Total Camera',
          data: res['data'].map((item: any) => item['count'] ),
        }]);
      }
    });
  }, [title]);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: chartCategories,
      labels: {
        rotateAlways: true,
      },
    },
    colors: [ '#A3A1FB', '#03A1FB' ],
    fill: {
      opacity: 1,
    },
    noData: {
      text: 'Loading...',
    },
  };

  return (
    <Box className={classes.min_content}>
      <Chart
        type="area"
        options={options}
        height={chartHeight}
        series={chartSeries}
      />
    </Box>
  );
};

const Wrapper = CardWidget<SingleBarChartProps>(AreaChart, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 12,
      y: 56,
      w: 12,
      h: 12,
      minW: 12,
      minH: 12,
    },
    md: {
      x: 0,
      y: 0,
      w: 6,
      h: 5,
      minW: 6,
      minH: 5,
    },
    sm: {
      x: 0,
      y: 0,
      w: 3,
      h: 5,
      minW: 2,
      minH: 5,
    },
    xs: {
      x: 0,
      y: 0,
      w: 12,
      h: 5,
      minW: 1,
      minH: 5,
    },
    xxs: {
      x: 0,
      y: 0,
      w: 12,
      h: 5,
      minW: 1,
      minH: 5,
    },
  },
});

export { Wrapper as AreaChart };
