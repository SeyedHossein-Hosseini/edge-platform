import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) =>
  createStyles({
    paper: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    button: {
      height: '100%',
    },
  })
);
