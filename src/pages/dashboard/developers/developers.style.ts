import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    'wrapper': {
      width: '100%',
      height: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    'lockBox': {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: '#FF5B5B',
      padding: theme.spacing(0.5, 2),
      marginBottom: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s linear',
    },
    'isLocked': {
      background: '#20CCA5',
      width: '100%',
      height: '100%',
      borderRadius: '0',
    },
    'svg': {
      fill: 'none',
      transform: 'translate3d(0,0,0)',
    },
    'lockBody': {
      'fill': 'white',
      'fillRule': 'evenodd',
      'clipRule': 'evenodd',
      'transform': 'rotate(8deg)',
      'transformOrigin': '14px 20px',
      'transition': 'all .2s ease',

      '$isLocked &': {
        transform: 'rotate(0)',
        transformOrigin: '14px 22px',
      },
    },
    'lockHandel': {
      'stroke': 'white',
      'strokeWidth': '4',
      'strokeLinejoin': 'round',
      'strokeLinecap': 'round',
      'strokeDasharray': '36',
      'transition': 'all .4s ease',

      '$isLocked &': {
        strokeDasharray: 48,
        animation: '$locked .3s linear forwards',
      },
    },
    'lockBling': {
      'stroke': 'white',
      'strokeWidth': 2.5,
      'strokeLinecap': 'round',
      'strokeDasharray': 3,
      'strokeDashoffset': 15,
      'transition': 'all .3s ease',

      '$isLocked &': {
        animationDelay: '0.2s',
        animation: '$bling .3s linear forwards',
      },
    },
    '@keyframes locked': {
      '50%': {
        transform: 'translateY(1px)',
      },
    },
    '@keyframes bling': {
      '50%': {
        strokeDasharray: 3,
        strokeDashoffset: 12,
      },
      '100%': {
        strokeDasharray: 3,
        strokeDashoffset: 9,
      },
    },
  })
);

export { useStyle };
