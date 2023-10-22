import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles(() =>
  createStyles({
    pageTitleWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);
