import { makeStyles, createStyles, Theme } from '@material-ui/core';

interface IStyle {
  centerContent?: boolean;
}

export const useStyle = makeStyles(() =>
  createStyles({
    csvAlert: {
      textAlign: 'center'
    },
  })
);
