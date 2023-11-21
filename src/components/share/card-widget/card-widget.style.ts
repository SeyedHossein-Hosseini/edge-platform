import { makeStyles, createStyles, Theme } from '@material-ui/core';

interface IStyle {
  centerContent?: boolean;
}

export const useStyle = makeStyles<Theme, IStyle>((theme: Theme) =>
  createStyles({
    gridCard: {
      width: '100%',
      height: '100%',
    },
    paper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: theme.spacing(1, 3),
      overflow: 'hidden',
      direction: 'ltr',
    },
    fullHeight: {
      minHeight: '100%',
    },
    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      direction: 'ltr',
    },
    content: {
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: (props) => (props.centerContent ? 'center' : 'flex-start'),
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    },
  })
);
