import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles(() =>
  createStyles({
    loadingBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heatMapGrid: {
      textAlign: 'center',
    },
    heatMapBtn: {
      background: '#f0f0f7',
    },

    dialogBox: {},

    dialogContent: {
      'padding': 0,
      'paddingTop': 0,
      'fontSize': 0,
      '&:first-child': {
        paddingTop: 0,
      },
      // 'width': '600px',
      // 'height': '600px',
      // 'display': 'flex',
      // 'position': 'relative',
      '& img': {
        'position': 'relative',
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
        // display: 'inline',
        'width': '100%',
        '&:last-child': {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          width: '100%',
        },
      },
    },
    closeBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 990,
    },
    min_content: {
      flex: 1,
      width: '100%',
      position: 'relative',
    },
  })
);
