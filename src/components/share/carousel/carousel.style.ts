import { makeStyles, createStyles } from '@material-ui/core';

export const useStyle = makeStyles((theme) =>
  createStyles({
    slider: {
      '& .slick-loading .slick-slide, .slick-loading .slick-track': {
        visibility: 'hidden',
      },

      '& .slick-slider': {
        'position': 'relative',
        'display': 'block',

        'boxSizing': 'border-box',
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        'user-select': 'none',
        '-webkit-touch-callout': 'none',
        '-khtml-user-select': 'none',
        '-ms-touch-action': 'pan-y',
        'touch-action': 'pan-y',
        '-webkit-tap-highlight-color': 'transparent',

        '& .slick-list, .slick-track': {
          '-webkit-transform': 'translate3d(0, 0, 0)',
          '-moz-transform': 'translate3d(0, 0, 0)',
          '-ms-transform': 'translate3d(0, 0, 0)',
          '-o-transform': 'translate3d(0, 0, 0)',
          'transform': 'translate3d(0, 0, 0)',
        },
      },
      '& .slick-list': {
        'position': 'relative',
        'display': 'block',

        'overflow': 'hidden',
        'margin': 0,
        'padding': 0,

        '&:focus': {
          outline: 0,
        },
        '& .dragging': {
          cursor: 'pointer',
        },
      },

      '& .slick-track': {
        'position': 'relative',
        'display': 'block',

        'top': 0,
        'left': 0,

        '&:after, &:before': {
          display: 'table',
          content: '',
        },

        '&:after': {
          clear: 'both',
        },
      },

      '& .slick-slide': {
        'display': 'none',
        'float': 'left',
        'height': '100%',

        'min-height': '1px',

        '& div': {
          '&:focus, &:active': {
            outline: 'none',
          },
        },

        '& .slick-loading img': {
          display: 'none',
        },
      },

      '& .slick-initialized .slick-slide': {
        display: 'block',
      },
      '& .slick-dots': {
        'display': 'flex !important',
        'justifyContent': 'center',
        'alignItems': 'center',
        'flexDirection': 'row',
        'margin': 0,
        'padding': 0,
        'marginTop': theme.spacing(3),

        '& li': {
          'listStyle': 'none',

          '& button': {
            'border': 0,
            'width': 10,
            'margin': 3,
            'height': 10,
            'padding': 0,
            'lineHeight': 0,
            'textIndent': 9999,
            'cursor': 'pointer',
            'overflow': 'hidden',
            'borderRadius': '50%',
            'backgroundColor': '#D7F4F1',

            '&:focus': {
              outline: 'none',
            },
          },

          '&.slick-active': {
            '& button': {
              backgroundColor: theme.palette.primary.main,
            },
          },
        },
      },
    },
  })
);
