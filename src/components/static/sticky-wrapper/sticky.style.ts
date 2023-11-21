import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
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
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },

    appBar: {
      position: 'relative',
    },

    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    drawer: {
      width: 400,
      maxWidth: '80%',
    },
  })
);

export { useStyle };
