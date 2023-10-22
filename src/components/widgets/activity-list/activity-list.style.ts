import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      'borderBottom': `2px solid ${theme.palette.divider}`,

      '&:last-child': {
        borderBottom: 'none',
      },
    },

    listItemClass: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(1),
    },
    activityTitle: {},
    logBox: {},
    useBranchBox: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(0.5),
      color: theme.palette.grey['500'],
    },
    branchName: {
      'position': 'relative',
      'textTransform': 'capitalize',
      'marginRight': theme.spacing(3),

      '&::after': {
        content: '\'\'',
        position: 'absolute',
        top: '50%',
        right: theme.spacing(-2),
        transform: 'translateY(-50%)',
        width: theme.spacing(1),
        height: theme.spacing(1),
        display: 'inline-block',
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
        opacity: 0.8,
      },
    },
    dot: {},
    activityTimeBox: {
      minWidth: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      color: theme.palette.grey['700'],
    },
  })
);
