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
  })
);

export { useStyle };
