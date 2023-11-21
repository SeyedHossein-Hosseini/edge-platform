import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
    },
    headerActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    pagination: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: theme.spacing(2),
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
