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
  })
);

export { useStyle };
