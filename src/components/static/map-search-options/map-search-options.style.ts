import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles(() =>
  createStyles({
    listItem: {
      'padding': '6px 4px',
      'margin': 'auto 0 auto 4px',
      '&:hover': {
        background: '#F3F3F3',
      },
    },
    listItemText: {
      padding: '6px 8px',
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
