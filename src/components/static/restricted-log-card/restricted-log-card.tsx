import { Box, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Image } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SpriteIcon } from 'src/components/share/sprite-icon';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { AppState } from 'src/redux/store';
import { RestrictedLogCardProps } from './restricted-log-card.props';
import { useStyle } from './restricted-log-card.style';


const RestrictedLogCard: React.FC<RestrictedLogCardProps> = ({
  status,
  cameraName,
  cameraSession,
  timeStamp,
  eventType,
  imageBtnHandler,
}) => {
  const dateConvertor = new DatePipe();
  const classes = useStyle();
  const { t } = useTranslation();
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);

  return (
    <Box className={classes.CameraCard}>
      <SpriteIcon iconName={status.toLowerCase()} type={'color'} height={65} width={65} />
      <Typography className={classes.CameraName} variant={'h4'} component={'p'} >{cameraName}</Typography>
      <Box className={classes.CameraActions}>
        <Tooltip title={t('restricted.galleryBtn') }>
          <>
            <IconButton
              disabled={status.toLowerCase() === 'safe'}
              className={classes.CameraGalleryBtn}
              onClick={() => imageBtnHandler(cameraSession)}
            >
              <Image/>
            </IconButton>
          </>
        </Tooltip>
      </Box>
    </Box>
  );
};

export { RestrictedLogCard };
