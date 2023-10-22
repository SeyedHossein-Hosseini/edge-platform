import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) =>
  createStyles({
    min_content: {
      flex: 1,
      width: '100%',
      position: 'relative',
      ...( theme.direction === 'rtl' && { direction: 'rtl' } ),
    },
  })
);
