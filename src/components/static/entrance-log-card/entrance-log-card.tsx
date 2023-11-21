import { Avatar, Box, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { AppState } from 'src/redux/store';
import { Videocam, Face, Today } from '@material-ui/icons';
import { EntranceLogCardProps } from './entrance-log-card.props';
import { environment } from '../../../../environments/environment';
import { useStyle } from './entrance-log-card.style';


const EntranceLogCard: React.FC<EntranceLogCardProps> = ({
  avatar,
  firstName,
  lastName,
  time,
  cameraName,
  detectedFace,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { locale } = useSelector((state: AppState) => state.AppSetting);
  const datePipe = new DatePipe();
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight;
  const PersianFormat = 'DD MMM YYYY HH:mm:ss';
  const EnglishFormat = 'DD MMM YYYY HH:mm:ss';

  const [ imageTooltipTop, setImageTooltipTop ] = useState<number>(0);
  const [ imageTooltipLeft, setImageTooltipLeft ] = useState<number>(0);
  const [ isImageTooltipVisible, setIsImageTooltipVisible ] = useState<boolean>(false);
  const [ shouldRenderOnTop, setShouldRenderOnTop ] = useState<boolean>(false);

  const setTooltipPosition = (event: any) => {
    setShouldRenderOnTop((event.clientY > viewPortHeight / 2));
    setIsImageTooltipVisible(true);
    setImageTooltipTop(event.clientY + 10);
    setImageTooltipLeft(event.clientX + 15);
  };

  return (
    <Paper className={classes.LogCardWrapper}>
      <div className={classes.LogCardProfile}>
        <Avatar className={classes.LogCardAvatar} alt={`${firstName} ${lastName}`} src={avatar} />
        <Typography component='p' variant='h6'><strong>{`${firstName} ${lastName}`}</strong></Typography>
        <ul className={classes.LogCardDetails}>
          <li>
            <Videocam />
            <Typography component='p' variant='subtitle1'>{ cameraName }</Typography>
          </li>
          <li>
            <Today />
            <Typography component='p' variant='subtitle1'>
              {datePipe.dateConvertor(time, (locale === 'fa') ? PersianFormat : EnglishFormat, locale)}
            </Typography>
          </li>
        </ul>
      </div>
      <Box className={classes.LogCardActions}>
        <Tooltip title={t('tooltips.detectedFace')}>
          <IconButton
            onMouseMove={(event) => setTooltipPosition(event)}
            onMouseLeave={() => setIsImageTooltipVisible(false)}
            aria-label={t('tooltips.assign')}
            size="medium"
          >
            <Face />
          </IconButton>
        </Tooltip>
      </Box>
      { isImageTooltipVisible &&
        <Box
          className={clsx(classes.LogCardImageTooltip, { [classes.LogCardImageTooltipTop]: shouldRenderOnTop })}
          style={{
            position: 'fixed',
            top: `${imageTooltipTop}px`,
            left: `${imageTooltipLeft}px`,
          }}
        >
          <img className={classes.LogCardImageTooltipSrc} src={environment.UploadsBasePath + detectedFace} alt={'Captured Face'} />
        </Box>
      }
    </Paper>
  );
};

export { EntranceLogCard };
