import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
    },
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
    },
    headerActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
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
    dialogHeader: {
      display: 'block',
      textAlign: 'center',
    },
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dialogImageBox: {
      overflow: 'hidden',
      backgroundColor: '#f0f0f0',
      fontSize: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      width: '100%',
      minWidth: '300px',
    },
    dialogImage: {
      maxWidth: '100%',
    },
  })
);

export { useStyle };
