import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    licenseCardWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'flex-start',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    licensePlateWrapper: {
      'display': 'flex',
      'flexDirection': 'row',
      'justifyContent': 'space-between',
      'alignItems': 'stretch',
      'fontSize': '32px',
      'padding': theme.spacing(0, 0, 0, 5),
      'border': `2px solid ${theme.palette.common.black}`,
      'borderRadius': theme.spacing(1),
      'marginRight': theme.spacing(1),
      'position': 'relative',
      'overflow': 'hidden',
      'width': '280px',
      'maxWidth': '100%',
      'flex': '1 0 auto',
      ...(theme.direction === 'rtl' && { direction: 'rtl', padding: theme.spacing(0, 5, 0, 0) }),

      '& *': {
        lineHeight: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      '& em': {
        margin: theme.spacing(0, 1),
        fontStyle: 'normal',
      },
    },
    licensePlateFlag: {
      'position': 'absolute',
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
      'justifyContent': 'space-between',
      'width': '40px',
      'height': '100%',
      'backgroundColor': '#039',
      'fontStyle': 'normal',
      'padding': theme.spacing(0.5, 0),
      'left': 0,
      'top': 0,
      ...(theme.direction === 'rtl' && { right: theme.spacing(0) }),

      '& > span': {
        color: theme.palette.common.white,
        lineHeight: 1,
        fontSize: '14px',
      },
    },
    licensePlateLargePart: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...(theme.direction === 'rtl' && { direction: 'rtl' }),
      margin: theme.spacing(0, 2, 0, 2),
      padding: theme.spacing(1, 0),
      flex: 4,
      width: '200px',
    },
    licensePlateCity: {
      'margin': theme.spacing(0, 1),
      'width': '40px',
      'position': 'relative',

      '&::before': {
        content: '""',
        position: 'absolute',
        left: theme.spacing(-1),
        top: 0,
        width: '2px',
        height: '100%',
        backgroundColor: theme.palette.common.black,
        ...(theme.direction === 'rtl' && { right: theme.spacing(-1) }),
      },
    },
    licenseCardInfo: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(0.5, 1),
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
      },
    },
    licenseCardInfoList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    licenseCardItem: {
      'display': 'flex',
      'alignItems': 'flex-start',
      'justifyContent': 'flex-start',
      'flexDirection': 'row',

      '& > p': {
        marginLeft: theme.spacing(1),
      },
    },
    licenseCardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    licensePlateImageTooltip: {
      pointerEvents: 'none',
      width: '200px',
      borderRadius: '5px',
      overflow: 'hidden',
      ...(theme.direction === 'ltr' && { transform: 'translateX(calc(-100% - 20px))' }),
    },
    licensePlateImageTooltipSrc: {
      fontSize: '0',
      width: '100%',
      display: 'block',
    },
    licenseCardChipItem: {
      marginRight: theme.spacing(1),
    },
  })
);

export { useStyle };
