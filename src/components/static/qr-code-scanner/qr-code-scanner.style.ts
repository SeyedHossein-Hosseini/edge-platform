import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    qrResult: {
      fontSize: '20px',
      marginTop: theme.spacing(1),
      textAlign: 'center',
    },
    NotifyBox: {
      position: 'relative',
      minHeight: '350px',
    },
    overlayNotify: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      zIndex: 3,
      backgroundColor: theme.palette.common.white,
    },
    notify: {
      textAlign: 'center',
      fontSize: '18px',
      color: theme.palette.text.primary,
    },
    VideoWrapper: {
      position: 'relative',
      width: '100%',
      marginBottom: theme.spacing(2),
      fontSize: 0,
      zIndex: 2,
    },
    qrOverlay: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      clipPath: 'polygon(0% 0%, 0% 100%, 30% 100%, 30% 25%, 70% 25%, 70% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)',
    },
    borderCorner: {
      display: 'inline-block',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '200px',
      height: '200px',
      background:
        'linear-gradient(to right, black 4px, transparent 4px) 0 0 ,' +
        'linear-gradient(to right, black 4px, transparent 4px) 0 100% ,' +
        'linear-gradient(to left, black 4px, transparent 4px) 100% 0 ,' +
        'linear-gradient(to left, black 4px, transparent 4px) 100% 100% ,' +
        'linear-gradient(to bottom, black 4px, transparent 4px) 0 0 ,' +
        'linear-gradient(to bottom, black 4px, transparent 4px) 100% 0 ,' +
        'linear-gradient(to top, black 4px, transparent 4px) 0 100% ,' +
        'linear-gradient(to top, black 4px, transparent 4px) 100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '30px 30px',
    },
    borderCornerSuccess: {
      background:
        'linear-gradient(to right, #81c784 4px, transparent 4px) 0 0 ,' +
        'linear-gradient(to right, #81c784 4px, transparent 4px) 0 100% ,' +
        'linear-gradient(to left, #81c784 4px, transparent 4px) 100% 0 ,' +
        'linear-gradient(to left, #81c784 4px, transparent 4px) 100% 100% ,' +
        'linear-gradient(to bottom, #81c784 4px, transparent 4px) 0 0 ,' +
        'linear-gradient(to bottom, #81c784 4px, transparent 4px) 100% 0 ,' +
        'linear-gradient(to top, #81c784 4px, transparent 4px) 0 100% ,' +
        'linear-gradient(to top, #81c784 4px, transparent 4px) 100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '30px 30px',
    },
  })
);

export { useStyle };
