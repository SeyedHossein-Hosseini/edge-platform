import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    LogCardWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1, 2),
      minHeight: theme.spacing(8),
    },
    LogCardProfile: {
      position: 'relative',
      paddingLeft: theme.spacing(7),
    },
    LogCardAvatar: {
      position: 'absolute',
      bottom: '50%',
      left: theme.spacing(0),
      transform: 'translateY(50%)',
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    LogCardDetails: {
      'display': 'flex',
      'flexDirection': 'row',
      'justifyContent': 'flex-start',
      'alignItems': 'flex-start',
      'padding': 0,
      'margin': 0,
      'listStyle': 'none',

      '& > li': {
        'display': 'flex',
        'flexDirection': 'row',
        'justifyContent': 'flex-start',
        'paddingRight': theme.spacing(2),
        'alignItems': 'center',
        'color': theme.palette.grey['700'],

        '& > p': {
          marginLeft: theme.spacing(0.5),
        },
      },
    },
    LogCardActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    LogCardImageTooltip: {
      pointerEvents: 'none',
      width: '150px',
      borderRadius: '5px',
      overflow: 'hidden',
      zIndex: 2,
      ...(theme.direction === 'ltr' && { transform: 'translateX(calc(-100% - 20px))' }),
    },
    LogCardImageTooltipTop: {
      transform: (theme.direction === 'ltr') ? 'translate(calc(-100% - 20px), calc(-100% - 30px))' : 'translate(0, calc(-100% - 30px))',
    },
    LogCardImageTooltipSrc: {
      fontSize: '0',
      width: '100%',
      display: 'block',
    },
  })
);

export { useStyle };
