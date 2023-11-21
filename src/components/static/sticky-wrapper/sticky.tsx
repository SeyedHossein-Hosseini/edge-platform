import React, { ReactNode, useState } from 'react';
import ReactSticky from 'react-stickynode';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStyle } from './sticky.style';
import {
  Fab,
  Box,
  Hidden,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
} from '@material-ui/core';

export interface StickyProps {
  title?: string;
  children: ReactNode;
}

const Sticky: React.FC<StickyProps> = ({ title, children }) => {
  const classes = useStyle();
  const [ open, setOpen ] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };
  return (
    <>
      <Hidden mdDown>
        <ReactSticky
          top={90}
          enabled={true}
          bottomBoundary={1200}
          className={classes.sideBar}
        >
          { title && <Typography
            variant="h3"
            component="p"
            className={classes.sideBarItemTitle}
          >
            {title}
          </Typography> }
          {children}
        </ReactSticky>
      </Hidden>
      <Hidden lgUp>
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={toggleDrawer(true)}
        >
          <FilterListIcon />
        </Fab>
      </Hidden>

      <SwipeableDrawer
        open={open}
        anchor="right"
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <Box>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer(false)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              { title && <Typography variant="h6" className={classes.title}>
                {title}
              </Typography> }
            </Toolbar>
          </AppBar>
          <Box px={1} py={1}>
            {children}
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export { Sticky };
