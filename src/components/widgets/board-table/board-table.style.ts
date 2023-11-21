import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    tableWrapper: {
      padding: theme.spacing(3),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
      },
    },
    networkChip: {
      'minWidth': 100,
      '&.online': {
        color: theme.palette.success.main,
        borderColor: theme.palette.success.main,
      },
      '&.offline': {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
      },
    },
    collapseData: {
      'textAlign': 'left',
      'padding': theme.spacing(2, 0),

      '& > *': {
        padding: theme.spacing(0.75, 0),
      },
    },
    iconButton: {
      // width: 30,
      // height: 30,
      border: `1px solid ${theme.palette.divider}`,
      margin: theme.spacing(0, 0.5),
    },
  })
);
