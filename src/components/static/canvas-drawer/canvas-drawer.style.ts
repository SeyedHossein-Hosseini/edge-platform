import { createStyles, fade, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
      // overflow: "hidden",
      fontSize: 0,
    },
    image: {
      maxWidth: '100%',
      fontSize: 0,
    },
    canvas: {
      cursor: 'crosshair',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 2,
      backgroundColor: theme.palette.grey['300'] + '50',
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    drawSpeedDial: {
      right: 'unset',
      left: theme.spacing(2),
    },
    backdrop: {
      backgroundColor: fade(theme.palette.common.black, 0.4),
      zIndex: theme.zIndex.speedDial - 1,
      position: 'absolute',
    },
    loading: {
      'backgroundColor': fade(theme.palette.common.black, 0.2),
      'zIndex': theme.zIndex.speedDial + 20,
      'position': 'absolute',
      'top': 0,
      'display': 'flex',
      'justifyContent': 'center',
      'alignItems': 'center',
      'minHeight': theme.spacing(10),
      'color': theme.palette.common.white,

      '& p': {
        marginLeft: theme.spacing(1),
      },
    },
  })
);

export { useStyle };
