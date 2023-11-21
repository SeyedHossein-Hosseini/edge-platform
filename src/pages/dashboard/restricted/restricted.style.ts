import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'flex-start',
    },
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
    sideBar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '410px',
      marginLeft: theme.spacing(2),
    },
    popup: {
      maxWidth: '100%',
    },
    skeleton: {
      borderRadius: '4px',
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
    dialogContentDetail: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      marginBottom: '10px',
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
      height: '400px',
    },
    dialogActions: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: theme.spacing(2, 0),
    },
  })
);

export { useStyle };
