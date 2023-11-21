import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { HeatmapProps } from './heatmap.interface';

import { CardWidget } from 'src/components/share/card-widget';
import { Box } from '@material-ui/core';

import { useStyle } from './heatmap.style';

const HeatMapChart: React.FC<HeatmapProps> = ({
  height,
  title,
  setTitle,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();

  const [ chartData, setChartData ] = useState([]);
  const [ chartHeight, setChartHeight ] = useState(350);
  const [ chartOptions, setChartOptions ] = useState({});

  const generateData = (count: number, yrange: any) => {
    let i = 0;
    const series = [];
    while (i < count) {
      const x = 'w' + (i + 1).toString();
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y,
      });
      i++;
    }
    return series;
  };

  useEffect(() => {
    const mocData = [
      {
        name: 'Week 1',
        data: generateData(12, { min: 0, max: 90 }),
      },
      {
        name: 'Week 2',
        data: generateData(12, { min: 0, max: 90 }),
      },
      {
        name: 'Week 3',
        data: generateData(12, { min: 0, max: 90 }),
      },
      {
        name: 'Week 4',
        data: generateData(12, { min: 0, max: 90 }),
      },
    ];
    setChartData(mocData);

    const chartOptions = {
      chart: {
        type: 'heatmap',

        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        heatmap: {
          colorScale: {
            inverse: true,
          },
        },
      },
      colors: ['#43425D'],
      xaxis: {
        type: 'category',
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
      },
      title: {
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#263238',
        },
      },
    };
    setChartOptions(chartOptions);
  }, []);

  useEffect(() => {
    setTitle(!title ? 'charts.heatMapChart' : title);
    setFullHeight(true);
  }, []);

  useEffect(() => {
    if (height) {
      setChartHeight(height - 24);
    } else {
      setChartHeight(350);
    }
  }, [height]);

  return (
    <Box className={classes.min_content}>
      <Chart
        options={chartOptions}
        height={chartHeight}
        series={chartData}
        type="heatmap"
      />
    </Box>
  );
};

const Wrapper = CardWidget<HeatmapProps>(HeatMapChart, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 0,
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

export { Wrapper as HeatMapChart };
