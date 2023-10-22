import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      'height': '100%',

      '& .check-button': {
        display: 'inline-block',
        transition: '0.12s all ease-in-out',
      },

      [theme.breakpoints.up('lg')]: {
        '& .check-button': {
          opacity: 0,
          pointerEvents: 'none',
        },

        '&:hover': {
          '& .check-button': {
            opacity: 1,
            pointerEvents: 'all',
          },
        },
      },

      '&:hover': {
        cursor: 'pointer',
        boxShadow: theme.shadows[15],
      },
    },
    headerBox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `2px solid ${theme.palette.primary.main}50`,
      padding: theme.spacing(1, 0),
      marginBottom: theme.spacing(2),

      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    infoTitles: {
      minWidth: 80,
      marginBottom: theme.spacing(1),
    },
    infoText: {
      'color': theme.palette.primary.main,
      'marginBottom': theme.spacing(0.8),

      '& .code': {
        color: theme.palette.primary.light,
      },
    },
    avatarGroup: {
      'display': 'flex',
      '& :nth-child(n+2)': {
        marginLeft: theme.spacing(-1),
      },
    },
    avatar: {
      width: 30,
      height: 30,
      border: `2px solid ${theme.palette.background.paper}`,
    },
    textWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    serviceIcons: {
      '& > svg': {
        padding: theme.spacing(0.5),
        borderRadius: '50%',
        border: `1px solid ${theme.palette.primary.main}`,
        background: theme.palette.background.paper,
      },
      '& :nth-child(n+2)': {
        marginLeft: theme.spacing(-1.25),
      },
    },
    cardAction: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [theme.breakpoints.down('md')]: {
        'flexDirection': 'column',
        'alignItems': 'flex-start',
        '& .check-button': {
          marginLeft: 0,
          marginTop: theme.spacing(1),
        },
      },
    },
  })
);
