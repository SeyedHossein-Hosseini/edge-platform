import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SpriteIcon } from 'src/components/share/sprite-icon';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { AppState } from 'src/redux/store';
import { environment } from '../../../../environments/environment';
import { logCardProps } from './log-card.props';
import { useStyle } from './log-card.style';


const LogCard: React.FC<logCardProps> = ({
  currentExtendedItem,
  galleryClickHandler,
  flipId,
  detailsClickHandler,
  cameraNumber,
  startTime,
  sessionID,
  gallery,
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const datePipe = new DatePipe();
  const { locale } = useSelector((state: AppState) => state.AppSetting);
  const logDateFormat = 'dddd - DD MMM YYYY - HH:mm:ss';

  return (
    <Accordion expanded={currentExtendedItem === flipId} onChange={() => detailsClickHandler(flipId)} >
      <AccordionSummary expandIcon={<ExpandMore />} >
        <Box className={classes.cardLogWrapper}>
          <span className={clsx([ classes.badge, { [classes.badgeHide]: currentExtendedItem === flipId }])} />
          <SpriteIcon className={classes.serviceIcon} type="mono" iconName="person" width={35} height={35} />
          <div className={classes.titleWrapper}>
            <Typography component='p' className={classes.mainTitle}>
              <strong>{datePipe.dateConvertor(startTime, logDateFormat, locale)}</strong>
            </Typography>
            <span className={classes.subTitle}>{t('restricted.galleryCount')} {gallery.length}</span>
          </div>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.accordionDetails}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              {gallery.length > 0 &&
                <>
                  <Typography component='p' className={classes.detailsTitle}><strong>Session Gallery</strong></Typography>
                  <Box className={classes.gallery}>
                    {gallery.map((item: any, index: number) =>
                      <figure
                        className={classes.imageItem}
                        key={index}
                        onClick={() => galleryClickHandler(gallery, index, cameraNumber)}
                      >
                        <img
                          src={environment.UploadsBasePath + item['thumbnail']}
                          alt={`Image ${index + 1} from Session ${sessionID}`}
                        />
                      </figure>
                    )}
                  </Box>
                </>
              }
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export { LogCard };
