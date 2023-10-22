import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    cardLogWrapper: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'row',
      width: '100%',
      padding: theme.spacing(0, 0, 0, 5),
    },
    subTitle: {},
    mainTitle: {},
    detailsTitle: {
      fontSize: theme.typography.h6.fontSize,
      marginBottom: theme.spacing(1),
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    description: {},
    timeStamp: {},
    badge: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'orange',
      height: `calc(100% + ${theme.spacing(3)}px)`,
      width: theme.spacing(1),
      opacity: 1,
      transition: 'all 0.2s ease-in-out',
      left: theme.spacing(-2),
      borderRadius: '4px 0 0 4px',
    },
    badgeHide: {
      opacity: 0,
    },
    serviceIcon: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      fill: '#b7b7b7',
      left: theme.spacing(0),
    },
    actions: {
      position: 'absolute',
      top: '50%',
      right: theme.spacing(0),
      transform: 'translateY(-50%)',
      transition: 'all 0.2s ease-in-out',
      opacity: 0,
    },
    showActions: {
      opacity: 1,
    },
    accordionDetails: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '100%',
    },
    detailsItem: {},
    detailsList: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      width: '100%',
      fontSize: '18px',
    },
    detailsListItem: {
      fontSize: '16px',
      lineHeight: 1.2,
      marginBottom: theme.spacing(1),
    },
    gallery: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      margin: theme.spacing(-1),
    },
    imageItem: {
      'flex': '0 0 calc(10% - 16px)',
      'height': '0',
      'paddingTop': 'calc(10% - 16px)',
      'margin': theme.spacing(1),
      'overflow': 'hidden',
      'position': 'relative',
      'borderRadius': '5px',
      'cursor': 'pointer',

      '& img': {
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: '100%',
      },
    },
    imageConfidence: {
      fontSize: '16px',
      textAlign: 'center',
      width: '100%',
      padding: theme.spacing(0.5, 0),
      position: 'absolute',
      bottom: '0',
      left: '0',
      backgroundColor: theme.palette.grey['400'],
    },
  })
);

export { useStyle };
