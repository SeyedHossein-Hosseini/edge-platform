import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      position: 'relative',
      minHeight: '350px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',
    },
    faceDrawer: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    NotifyBox: {
      position: 'relative',
      minHeight: '350px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    notify: {
      textAlign: 'center',
      fontSize: '18px',
      color: theme.palette.text.primary,
    },
    canvas: {
      display: 'none',
      position: 'absolute',
      top: '0',
      left: '0',
    },
    images: {
      listStyle: 'none',
      padding: 0,
      flex: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      margin: theme.spacing(0, -1),
    },
    VideoWrapper: {
      position: 'relative',
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    capture: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    imagesItem: {
      'width': 'calc( 20% - 16px)',
      'margin': theme.spacing(0, 1, 1, 1),

      '& > img': {
        width: '100%',
        overflow: 'hidden',
        fontSize: 0,
      },
    },
  })
);

export { useStyle };
