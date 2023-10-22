import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
    },
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
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
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'flex-start',
      'justifyContent': 'flex-start',
      'width': '410px',
      'marginLeft': theme.spacing(2),

      '& > *': {
        width: '100%',
      },
    },
    sideBarItemTitle: {
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1, 0),
    },
  })
);

export { useStyle };
