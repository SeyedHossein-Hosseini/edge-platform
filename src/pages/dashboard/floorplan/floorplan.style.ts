import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    floorplanViewer: {
      'padding': theme.spacing(1),
      'border': `3px solid ${theme.palette.divider}`,
      'position': 'relative',
      'backgroundImage':
        // eslint-disable-next-line max-len
        'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAADFBMVEV/f3////9/f39/f39xh0+XAAAABHRSTlMAAGbMEuYkIAAAAB1JREFUeAFjYEQDQAEmBlQBJmYmVAEGdBVAMEwEAIvjAQSzFyXaAAAAAElFTkSuQmCC\')',

      '& .layer': {
        width: '100%',
        height: '100%',
        // background: 'whitesmoke',
        zIndex: 10,
        position: 'absolute',
        left: 0,
        top: 0,
        // opacity: 0.5,
      },
    },
    widgets: {
      'height': '100%',
      'border': `3px solid ${theme.palette.divider}`,

      '& .active': {
        background: theme.palette.primary.light,
        color: theme.palette.common.white,
      },
    },
    cursor: {
      cursor: 'crosshair',
    },
  })
);
