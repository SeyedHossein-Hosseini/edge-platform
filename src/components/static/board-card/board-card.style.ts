import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    BoardCardWrapper: {
      padding: theme.spacing(2),
    },
    BoardCardHeader: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: theme.spacing(1),
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
    BoardCardInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'canter',
      justifyContent: 'flex-start',
      padding: theme.spacing(1, 0),
      listStyle: 'none',
    },
    BoardCardInfoItem: {
      'marginBottom': theme.spacing(1),
      'display': 'flex',
      'flexDirection': 'row',
      'alignItems': 'canter',
      'justifyContent': 'space-between',

      '& > span:first-child': {
        color: theme.palette.grey['500'],
        fontWeight: '200',
      },

      '& > span:first-child:after': {
        content: '":"',
        fontWeight: '200',
        paddingLeft: theme.spacing(0.5),
      },
    },
  })
);

export { useStyle };
