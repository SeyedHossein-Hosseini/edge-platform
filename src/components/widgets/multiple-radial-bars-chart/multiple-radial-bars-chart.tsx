import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { CardWidget } from 'src/components/share/card-widget';
import { useStyle } from './multiple-radial-bars-chart.style';
import { Box } from '@material-ui/core';
import { ApexOptions } from 'apexcharts';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { dangerStatusBaseOnCamera } from 'src/services/api/statistics.api';

export interface MultipleRadialBarsChartProps extends CardWidgetProps {}

const MultipleRadialBarsChart: React.FC<MultipleRadialBarsChartProps> = ( {
  height,
  title,
  setTitle,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ chartHeight, setChatHeight ] = useState(350);
  const [ chartData, setChartData ] = useState([]);
  const [ totalData, setTotalData ] = useState<number>(0);

  useEffect(() => {
    if (height) {
      setChatHeight(height - 24);
    } else {
      setChatHeight(350);
    }
  }, [height]);

  useEffect(() => {
    setTitle(!title ? 'charts.multipleRadialBarsChart' : title);
    setFullHeight(true);
  }, []);

  useEffect(() => {
    dangerStatusBaseOnCamera().subscribe( (res: any) => {
      if ( res['isOk'] ) {
        let Total = 0;
        setChartData( res['data'] );
        res['data'].map((item: any) => {
          Total = Total + item['stream_count'];
        });
        setTotalData(Total);
      }
    });
    return () => null;
  }, [title]);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      type: 'radialBar',
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
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
            formatter: () => {
              let Total = 0;
              chartData.map((item: any) => {
                Total = Total + item['stream_count'];
              });
              return Total.toString();
            },
          },
        },
      },
    },
  };

  return (
    <Box className={classes.min_content}>
      <Chart
        type="radialBar"
        options={options}
        height={chartHeight}
        series={chartData.map((item: any) => Math.round(item['stream_count'] / totalData * 100))}
      />
    </Box>
  );
};

const Wrapper = CardWidget<MultipleRadialBarsChartProps>(MultipleRadialBarsChart, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 0,
      y: 24,
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

export { Wrapper as MultipleRadialBarsChart };
