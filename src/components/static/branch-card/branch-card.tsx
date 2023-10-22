import {
  Avatar, Box, Button, Card, CardActions,
  CardContent, Typography, useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { SpriteIcon } from 'src/components/share/sprite-icon/sprite-icon';
import { BranchProps } from 'src/interfaces/branch.interface';
import { PhoneNumberPipe } from 'src/pipes/phone-number/phone-number.pipe';
import { useStyle } from './branch-card.style';

interface IProps {
  branchData: BranchProps;
}

const BranchCard: React.FC<IProps> = ({ branchData }) => {
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const { phoneNumberParser } = new PhoneNumberPipe();
  const {
    branchName,
    superVisors,
    address,
    fax,
    tel,
    id,
    services,
  } = branchData;

  const phoneNumberParse = phoneNumberParser(tel);
  const faxNumberParse = phoneNumberParser(fax);

  const phoneCode = phoneNumberParse.callingCode;
  const faxCode = faxNumberParse.callingCode;

  const phoneNum = phoneNumberParse.international.replace('+' + phoneCode, '');
  const faxNum = faxNumberParse.international.replace('+' + faxCode, '');

  const isFD = services.includes('FD');
  const isFB = services.includes('FB');
  const isPC = services.includes('PC');

  const onClickHandler = () => {
    history.push(`/branch-list/${id}`);
  };

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent>
        <Box className={classes.headerBox}>
          <Typography variant="h3">{branchName}</Typography>
          <Box className={classes.avatarGroup}>
            {superVisors.map(({ avatar }, index) => (
              <Avatar src={avatar} className={classes.avatar} key={index} />
            ))}
          </Box>
        </Box>

        <Box className={classes.textWrapper}>
          <Box className={classes.infoTitles}>
            <Typography className={classes.infoText}>Tel:</Typography>
            <Typography className={classes.infoText}>Fax:</Typography>
            <Typography className={classes.infoText}>Address:</Typography>
          </Box>
          <Box>
            <Typography className={classes.infoText}>
              <span className="code">+{phoneCode}</span> {phoneNum}
            </Typography>
            <Typography className={classes.infoText}>
              <span className="code">+{faxCode}</span> {faxNum}
            </Typography>
            <Typography className={classes.infoText}>{address}</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Box className={classes.serviceIcons}>
          {isFB && (
            <SpriteIcon
              type="color"
              iconName="face-bluring"
              width={35}
              height={35}
            />
          )}
          {isFD && (
            <SpriteIcon
              type="color"
              iconName="fire-detection"
              width={35}
              height={35}
            />
          )}
          {isPC && (
            <SpriteIcon
              type="color"
              iconName="people-counting"
              width={35}
              height={35}
            />
          )}
        </Box>
        <Button
          fullWidth={md}
          variant="outlined"
          color="primary"
          onClick={onClickHandler}
          className="check-button"
        >
          Check Branch
        </Button>
      </CardActions>
    </Card>
  );
};

export { BranchCard };
