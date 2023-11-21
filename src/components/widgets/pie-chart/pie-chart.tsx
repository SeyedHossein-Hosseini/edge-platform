import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'src/components/share/card-widget';
import { useStyle } from './pie-chart.style';
import { Box } from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { licensePlateCountPerCamera } from 'src/services/api/statistics.api';

export interface PieChartProps extends CardWidgetProps {}

const PieChart: React.FC<PieChartProps> = ( {
  height,
  title,
  setTitle,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ chartHeight, setChatHeight ] = useState(350);
  const [ chartData, setChartData ] = useState([]);

  useEffect(() => {
    if (height) {
      setChatHeight(height - 24);
    } else {
      setChatHeight(350);
    }
  }, [height]);

  useEffect(() => {
    setTitle(!title ? 'charts.pieChart' : title);
    setFullHeight(true);
  }, []);

  useEffect(() => {
    licensePlateCountPerCamera().subscribe( (res: any) => {
      if ( res['isOk'] ) {
        setChartData( res['data'] );
      }
    });
    return () => null;
  }, [title]);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: 'pie',
    },
    labels: chartData.map((item: any) => `Camera: #${item['stream_id']}`),
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    noData: {
      text: 'Loading...',
    },
  };

  return (
    <Box className={classes.min_content}>
      <Chart
        type="pie"
        options={options}
        height={chartHeight}
        series={chartData.map((item: any) => item['stream_count'])}
      />
    </Box>
  );
};

const Wrapper = CardWidget<PieChartProps>(PieChart, {
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

export { Wrapper as PieChart };
