import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme ) =>
  createStyles( {
    box: {
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      minHeight: '100%',
      padding: theme.spacing( 2, 0 ),
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    input: {
      width: '100%',
    },
    variable: {
      fontSize: 25,
      lineHeight: 1,
    },
  })
);

export { useStyle };
