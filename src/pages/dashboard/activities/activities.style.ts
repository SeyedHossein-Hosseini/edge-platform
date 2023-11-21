import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    boxItem: {
      backgroundColor: '#e9e9e9',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  })
);
