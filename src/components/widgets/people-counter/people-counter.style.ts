import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    editFooter: {
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
      'position': 'absolute',
      'bottom': '20px',
      'width': '100%',

      '& > *': {
        margin: theme.spacing(0, 0.5),
      },
    },
    wrapper: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    variable: {
      'fontSize': 100,
      'marginRight': theme.spacing(2),
      'lineHeight': 1,
      'padding': theme.spacing(0, 1.5),
      'color': theme.palette.primary.main,

      '&[contentEditable="true"]': {
        backgroundColor: theme.palette.grey['200'],
        borderRadius: theme.spacing(1),
      },
    },
    constant: {
      'fontSize': 72,
      'opacity': 0.5,
      'lineHeight': 1,
      'padding': theme.spacing(0, 1.5),
      'color': theme.palette.primary.main + '5F',

      '&[contentEditable="true"]': {
        backgroundColor: theme.palette.grey['200'],
        borderRadius: theme.spacing(1),
      },
    },
  })
);

export { useStyle };
