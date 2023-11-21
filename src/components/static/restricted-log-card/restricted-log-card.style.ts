import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    CameraCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      position: 'relative',
      backgroundColor: '#EDF1F4',
      backgroundImage: 'linear-gradient(180deg, #EDF1F4 0%, #C3CBDC 74%)',
      borderRadius: '10px',
      padding: theme.spacing(2),
    },
    CameraName: {
      marginTop: theme.spacing(1),
      fontSize: '18px',
      color: theme.palette.primary.main,
    },
    CameraActions: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing(1.25),
    },
    CameraFooter: {
      'display': 'flex',
      'flexDirection': 'row',
      'alignItems': 'center',
      'justifyContent': 'center',
      'flexWrap': 'wrap',

      '& > *': {
        marginRight: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
      },
    },
    CameraGalleryBtn: {},
  })
);

export { useStyle };
