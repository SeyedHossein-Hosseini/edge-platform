import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    userWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(2),
      textAlign: 'center',
      height: '100%',
      color: theme.palette.grey['900'],
    },
    userIsActive: {},
    userIsHorizontal: {
      flexDirection: 'row',
    },
    userContent: {
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
      'justifyContent': 'flex-start',
      'position': 'relative',

      '$userIsHorizontal &': {
        alignItems: 'flex-start',
        width: '100%',
      },
    },
    userBadge: {
      'width': '100%',
      'position': 'relative',
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
      'marginBottom': theme.spacing(3),

      '& > span': {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translate(-50%, 50%)',
      },

      '$userIsHorizontal &': {
        width: '128px',
        height: '128px',
        margin: theme.spacing(0, 3, 0, 0),
        flex: '1 0 auto',
      },
    },
    userAvatar: {
      'width': '80%',
      'height': '0',
      'paddingTop': '80%',
      'filter': 'grayscale(100%)',
      'borderRadius': '100%',
      'position': 'relative',
      'overflow': 'hidden',
      'opacity': 0.4,
      'backgroundColor': theme.palette.grey['100'],
      'margin': 0,

      '& > img': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        transform: 'translate(-50%, -50%)',
      },

      '$userIsActive &': {
        filter: 'grayscale(0%)',
        opacity: 1,
      },

      '$userIsHorizontal &': {
        width: '128px',
        paddingTop: '128px',
        flex: '1 0 auto',
      },
    },
    userName: {
      'fontSize': '20px',
      'lineHeight': 1.3,
      'minHeight': 2 * (1.3 * 20) + 'px',
      'marginBottom': theme.spacing(1),
      'display': 'inline-flex',
      'alignItems': 'center',
      'color': theme.palette.grey.A100,

      '$userIsActive &': {
        color: theme.palette.grey['900'],
      },

      '$userIsHorizontal &': {
        fontSize: '18px',
        lineHeight: 1.3,
        minHeight: (1.3 * 18) + 'px',
        textAlign: 'left',
      },
    },
    userSubtitle: {
      'fontSize': '14px',
      'lineHeight': 1.2,
      'marginBottom': theme.spacing(3),
      'color': theme.palette.grey.A100,

      '$userIsActive &': {
        color: theme.palette.grey['600'],
      },

      '$userIsHorizontal &': {
        marginBottom: theme.spacing(2.5),
      },
    },
    userProfile: {
      'opacity': 0.5,

      '$userIsActive &': {
        opacity: 1,
      },
    },
  })
);

export { useStyle };
