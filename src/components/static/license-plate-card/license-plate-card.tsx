import { Box, Chip, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Accessible, Image, Today, Videocam } from '@material-ui/icons';
import { Plate } from '@persian-tools/persian-tools';
import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import licenseCharsMap from 'src/dump/license-char.dump';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { AppState } from 'src/redux/store';
import { environment } from '../../../../environments/environment';
import { licensePlateCardProps } from './license-plate-card.props';
import { useStyle } from './license-plate-card.style';


const LicensePlateCard: React.FC<licensePlateCardProps> = ({
  licenseID,
  flag,
  char,
  timestamp,
  streamId,
  image,
  imagePreviewHandler,
}) => {
  const datePipe = new DatePipe();
  const classes = useStyle();
  const { t } = useTranslation();
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);
  const PersianFormat = 'DD MMM YYYY HH:mm:ss';
  const EnglishFormat = 'DD MMM YYYY HH:mm:ss';
  const LicensePlateColors: any = licenseCharsMap;
  const PlateInformation = Plate({ number: licenseID, char: LicensePlateColors[char]['char'] }).info;

  const [ imageTooltipTop, setImageTooltipTop ] = useState<number>(0);
  const [ imageTooltipLeft, setImageTooltipLeft ] = useState<number>(0);
  const [ isImageTooltipVisible, setIsImageTooltipVisible ] = useState<boolean>(false);

  const setTooltipPosition = (event: any) => {
    setIsImageTooltipVisible(true);
    setImageTooltipTop(event.clientY + 10);
    setImageTooltipLeft(event.clientX + 15);
  };

  return (
    <Box className={classes.licenseCardWrapper}>
      <div className={classes.licensePlateWrapper} style={{ backgroundColor: LicensePlateColors[char]['color'] }}>
        <i className={classes.licensePlateFlag}>
          <ReactCountryFlag countryCode={flag} style={{ fontSize: '20px' }} />
          <span>I.R</span>
        </i>
        <div className={classes.licensePlateLargePart} style={{ color: LicensePlateColors[char]['text'] ?? '#000000' }}>
          {licenseID.substr(0, 2)}
          <em>{(char !== 'O') ? LicensePlateColors[char]['char'] : <Accessible style={{ fontSize: '32px' }} />}</em>
          {licenseID.substr(2, 3)}
        </div>
        <div className={classes.licensePlateCity} style={{ color: LicensePlateColors[char]['text'] ?? '#000000' }}>
          {licenseID.substr(5, 2)}
        </div>
      </div>
      <Box className={classes.licenseCardInfo}>
        <ul className={classes.licenseCardInfoList}>
          <li className={classes.licenseCardItem}>
            <Today />
            <Typography component='p' variant='subtitle1'>
              {datePipe.dateConvertor(timestamp, (locale === 'fa') ? PersianFormat : EnglishFormat, locale)}
            </Typography>
          </li>
        </ul>
        <Box className={classes.licenseCardActions}>
          {PlateInformation['category'] && <Chip
            label={PlateInformation['category']}
            color="primary"
            variant="outlined"
            size="small"
            className={classes.licenseCardChipItem}
          />}
          {streamId && <Chip
            label={streamId}
            icon={<Videocam />}
            color="primary"
            variant="outlined"
            size="small"
            className={classes.licenseCardChipItem}
          />}
          <Tooltip disableHoverListener title={t('licensePlate.checkFrame')} placement="right">
            <IconButton
              onClick={() => imagePreviewHandler(image)}
              onMouseMove={(event) => setTooltipPosition(event)}
              onMouseLeave={() => setIsImageTooltipVisible(false)}
            >
              <Image />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {isImageTooltipVisible &&
        <Box
          className={classes.licensePlateImageTooltip}
          style={{
            position: 'fixed',
            top: `${imageTooltipTop}px`,
            left: `${imageTooltipLeft}px`,
          }}
        >
          <img className={classes.licensePlateImageTooltipSrc} src={environment.UploadsBasePath + image} alt={'Captured LicensePlate'} />
        </Box>
      }
    </Box>
  );
};

export { LicensePlateCard };
