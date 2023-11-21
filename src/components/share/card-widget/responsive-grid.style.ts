import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) =>
  createStyles({
    layout: {
      'direction': theme.direction,
      ...( theme.direction === 'rtl' && { direction: 'rtl' } ),

      '& > div > div': {
        height: '100%',
      },

      '& .grid_handle:hover': {
        cursor: 'all-scroll',
      },
    },
  })
);
