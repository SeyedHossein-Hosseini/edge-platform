import {
  Box, CircularProgress, Dialog, DialogContent, Divider, Grid, IconButton, Tooltip, Typography,
} from '@material-ui/core';
import { Close, Whatshot } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cameraBadge from 'src/assets/Camer_Badge.svg';
import { CardWidget } from 'src/components/share/card-widget';
import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';
import { Carousel } from 'src/components/share/carousel/carousel';
import { AppState } from 'src/redux/store';
import { getHeatmapImage } from 'src/services/branch-api/board-data-api';
import { useStyle } from './camera-information.style';

interface IProps extends CardWidgetProps { }

const CameraInformation: React.FC<IProps> = ({
  title,
  setTitle,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { activeCameraInfo } = useSelector(
      (state: AppState) => state.AppSetting
  );

  const [ heatMapData, setHeatMapData ] = useState(undefined);

  useEffect(() => {
    setTitle(!title ? 'cameraInfo.widgetTitle' : title);
    setFullHeight(true);
  }, []);

  const getHeatmapImages = async () => {
    const response = await getHeatmapImage();
    setHeatMapData(response);
  };

  const renderData = () => {
    return (
      <Carousel>
        {activeCameraInfo.map((data, inx) => (
          <div key={inx}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <img src={cameraBadge} alt="" />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h2" align="center">
                  {data.name}
                </Typography>
                <Typography variant="h3" align="center">
                  {data.id}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography align="center" gutterBottom>{t('cameraInfo.quality')}</Typography>
                <Typography align="center">{data.quality}</Typography>
              </Grid>

              <Grid item xs={1}>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ height: '100%' }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography align="center" gutterBottom>{t('cameraInfo.status')}</Typography>
                <Typography
                  align="center"
                  style={{
                    color: data.network === 'ONLINE' ? 'green' : 'red',
                  }}
                >
                  {data.network}
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ height: '100%' }}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography align="center" gutterBottom>{t('cameraInfo.fps')}</Typography>
                <Typography align="center">{data.fps}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.heatMapGrid}>
                <Tooltip title="Camera Heatmap" placement="top" arrow>
                  <IconButton
                    onClick={getHeatmapImages}
                    size="medium"
                    className={classes.heatMapBtn}
                  >
                    <Whatshot fontSize="default" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <Box className={classes.min_content}>
      {activeCameraInfo ? (
        renderData()
      ) : (
        <Box className={classes.loadingBox}>
          <CircularProgress />
        </Box>
      )}
      <Dialog open={!!heatMapData} onClose={() => setHeatMapData(undefined)}>
        <DialogContent className={classes.dialogContent}>
          <IconButton
            onClick={() => setHeatMapData(undefined)}
            className={classes.closeBtn}
          >
            <Close />
          </IconButton>
          <img src={heatMapData?.image} />
          <img src={heatMapData?.heatArea} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const Wrapper = CardWidget<IProps>(CameraInformation, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 0,
      y: 32,
      w: 6,
      h: 13,
      minW: 6,
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

export { Wrapper as CameraInformation };
