import { Box } from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'src/components/share/card-widget';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { useStyle } from './single-bar-chart.style';
import { faceDistance } from 'src/services/api/statistics.api';

export interface SingleBarChartProps extends CardWidgetProps { }

const SingleBarChart: React.FC<SingleBarChartProps> = ({
  height,
  title,
  setTitle,
  setMenuItems,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ chartHeight, setChatHeight ] = useState(350);
  const [ categories, setCategories ] = useState<Array<string>>([]);
  const [ series, setSeries ] = useState<any>([]);

  useEffect(() => {
    setTitle(!title ? 'charts.singleBarChart' : title);
    setFullHeight(true);
  }, []);

  useEffect(() => {
    faceDistance().subscribe( (res: any) => {
      if ( res['isOk'] ) {
        setCategories( res['data'].map((item: any) => item['dist_range'] ) );
        setSeries([{
          name: 'Detected Face',
          data: res['data'].map((item: any) => item['count'] ),
        }]);
      }
    });
  }, [title]);

  useEffect(() => {
    if (height) {
      setChatHeight(height - 24);
    } else {
      setChatHeight(350);
    }
  }, [height]);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    colors: ['#A3A1FB'],
    xaxis: {
      categories,
      labels: {
        rotateAlways: true,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function(val: number) {
          return val + ' Face';
        },
      },
    },
    noData: {
      text: 'Loading...',
    },
  };

  return (
    <Box className={classes.min_content}>
      <Chart
        type="bar"
        options={options}
        height={chartHeight}
        series={series}
      />
    </Box>
  );
};

const Wrapper = CardWidget<SingleBarChartProps>(SingleBarChart, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 0,
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

export { Wrapper as SingleBarChart };
