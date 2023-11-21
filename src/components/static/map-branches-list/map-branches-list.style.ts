import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      'padding': '6px 4px',
      'margin': 'auto 0 auto 4px',

      '&:hover': {
        background: '#F3F3F3',
      },

      '& .pin-button': {
        display: 'inline-block',
        transition: '0.12s all ease-in-out',
      },

      [theme.breakpoints.up('lg')]: {
        '& .pin-button': {
          opacity: 0,
          pointerEvents: 'none',
        },

        '&:hover': {
          '& .pin-button': {
            opacity: 1,
            pointerEvents: 'all',
          },
        },
      },
    },
    listIcon: {
      minWidth: '20px',
      color: '#A3A6B4',
      opacity: 1,
      pointerEvents: 'auto',
      cursor: 'pointer',
    },
    box: {
      color: '#A3A6B4',
    },
    listItemText: {
      padding: '6px 8px',
    },
    dontShowListIcon: {
      'opacity': 0,
      'transition': '0.5s ease',
      'pointerEvents': 'none',
      '@media (max-width: 40em)': {
        opacity: 1,
        pointerEvents: 'auto',
        cursor: 'pointer',
      },
    },
  })
);
