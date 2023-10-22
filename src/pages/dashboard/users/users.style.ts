import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
    },
    contentWrapper: {
      width: '100%',
    },
    sideBarItem: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
      height: '300px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    iconButton: {
      padding: theme.spacing(1),
      margin: theme.spacing(0, 0.5),
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2, 0),
    },
  })
);

export { useStyle };
