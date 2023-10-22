import { Box } from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'src/components/share/card-widget';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { useStyle } from './multi-bar-chart.style';

export interface MultiBarChartProps extends CardWidgetProps { }

const MultiBarChart: React.FC<MultiBarChartProps> = ({
  height,
  title,
  setTitle,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ chartHeight, setChatHeight ] = useState(350);
  const series = [
    {
      name: 'In',
      data: [ 44, 55, 57, 56, 61, 58, 63, 60, 66, 25, 11, 100, 35 ],
    },
    {
      name: 'Out',
      data: [ 76, 85, 101, 98, 87, 105, 91, 114, 94, 44, 55, 57, 56 ],
    },
  ];
  const categories = [
    '04 Jan, 9:00',
    '04 Jan, 10:00',
    '04 Jan, 11:00',
    '04 Jan, 12:00',
    '04 Jan, 13:00',
    '04 Jan, 14:00',
    '04 Jan, 15:00',
    '04 Jan, 16:00',
    '04 Jan, 17:00',
    '04 Jan, 18:00',
    '04 Jan, 19:00',
    '04 Jan, 20:00',
    '04 Jan, 21:00',
  ];

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
        columnWidth: '60%',
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
    xaxis: {
      categories,
      labels: {
        rotateAlways: true,
      },
    },
    legend: {
      markers: {
        fillColors: [ '#5FE3A1', '#FF8373' ],
      },
    },
    fill: {
      colors: [ '#5FE3A1', '#FF8373' ],
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function(val: number) {
          return val + ' person';
        },
      },
    },
    noData: {
      text: 'Loading...',
    },
  };

  useEffect(() => {
    if (height) {
      setChatHeight(height - 24);
    } else {
      setChatHeight(350);
    }
  }, [height]);

  useEffect(() => {
    setTitle(!title ? 'charts.multiBarChart' : title);
    setFullHeight(true);
  }, []);

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

const Wrapper = CardWidget<MultiBarChartProps>(MultiBarChart, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 12,
      y: 44,
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

export { Wrapper as MultiBarChart };
