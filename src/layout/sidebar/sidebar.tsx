import {
  Backdrop, Box, Collapse, Drawer, IconButton, Link,
  List, ListItem, Typography,
  useMediaQuery, useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import Hammer from 'react-hammerjs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
import actions from 'src/redux/appSetting/actions';
import { AppState } from 'src/redux/store';
import { environment } from '../../../environments/environment';
import { IMenuItem } from './menus.interface';
import { menus } from './menus.seed.irib';
import { ISidebarProps } from './sidbar.interface';
import { useStyle } from './sidebar.style';

const Sidebar: React.FC<ISidebarProps> = ({ width }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const classes = useStyle({ width });
  const { t, i18n } = useTranslation();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const menuRef = useRef(null);

  const [ open, setOpen ] = useState(true);
  const [ openSubmenu, setOpenSubmenu ] = useState<number>();
  const [ menuHeight, setMenuHeight ] = useState<number>();
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);

  const handleToggleDrawer = (direction?: number) => {
    if (direction) {
      direction === 4 && setOpen(true);
      direction === 2 && setOpen(false);
    } else {
      setOpen(!open);
    }
  };

  const handleToggleSubmenu = (
      itemKey?: number,
      event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    setOpenSubmenu((prevItemKey) =>
      prevItemKey === itemKey ? undefined : itemKey
    );
  };

  useEffect(() => {
    dispatch(actions.setDrawer(open));
  }, [open]);

  useEffect(() => {
    if (matches) {
      setOpen(false);
    }
  }, [matches]);

  useEffect(() => {
    if (matches) {
      setOpen(false);
    }
  }, [ matches, pathname ]);

  const RenderRootMenu = ({ item, id }: { item: IMenuItem; id: number }) => {
    const { label, icon: ItemIcon, path, submenus } = item;
    return (
      <>
        <ListItem className={classes.linkListItem}>
          <NavLink
            to={`/${locale}/${path}`}
            {...(!submenus && {
              exact: true,
              onClick: () => handleToggleSubmenu(-1),
            })}
            className={classes.link}
            activeClassName={classes.activeLink}
          >
            <Typography variant="body1" className={classes.linkLabel}>
              <ItemIcon className={classes.icon} />
              {t(label)}

              {submenus && (
                <IconButton
                  onClick={(
                      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleToggleSubmenu(id, event)}
                  className={classes.expandButton}
                >
                  {openSubmenu === id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
            </Typography>
          </NavLink>
        </ListItem>
        {submenus && open && (
          <Collapse in={openSubmenu === id} timeout="auto" unmountOnExit>
            <List component="ul" disablePadding className={classes.submenu}>
              {submenus.map(({ label, path }, index) => (
                <NavLink
                  to={`/${locale}/${path}`}
                  key={index}
                  exact={true}
                  color="textPrimary"
                  className={classes.submenuItem}
                  activeClassName={classes.activeLink}
                >
                  <Typography variant="body1" className={classes.linkLabel}>
                    {t(label)}
                  </Typography>
                </NavLink>
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  };

  const drawer = () => (
    <Drawer
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      ref={menuRef}
    >
      <Box className={classes.sidebarLogo}>
        {matches && open && <img alt={'Professor Management System'} src={'./logo.svg'} />}
        {!matches && <img alt={'Professor Management System'} src={'./logo.svg'} />}
      </Box>
      <Scrollbar rtl={(direction === 'rtl')} noScrollX={true}>
        <List component="ul" className={classes.linkList}>
          {menus.map((menu, index) => {
            return <RenderRootMenu key={index} id={index} item={menu} />;
          })}
        </List>
        {!environment.production && (
          <>
            {/* <ListItem className={classes.linkListItem}>
              <Link
                onClick={() =>
                  dispatch(
                      actions.setToast({
                        message: 'Toast Called!!',
                        severity: 'error',
                        horizontal: 'left',
                        vertical: 'bottom',
                        autoHideDuration: 2000,
                        action: {
                          label: 'test',
                          fn: () => console.warn('test'),
                        },
                      })
                  )
                }
                className={classes.link}
              >
                <Typography variant="body1" className={classes.linkLabel}>
                  <NotificationsActiveIcon className={classes.icon} />
                  Toast Test
                </Typography>
              </Link>
            </ListItem>
            <ListItem className={classes.linkListItem}>
              <Link
                onClick={() =>
                  dispatch(
                      actions.setToast({
                        message: 'Toast Called!!',
                        severity: 'info',
                        horizontal: 'right',
                        vertical: 'top',
                      })
                  )
                }
                className={classes.link}
              >
                <Typography variant="body1" className={classes.linkLabel}>
                  <NotificationsActiveIcon className={classes.icon} />
                  Toastify Test
                </Typography>
              </Link>
            </ListItem> */}
          </>
        )}
      </Scrollbar>
      <IconButton
        onClick={() => handleToggleDrawer()}
        className={classes.toggleButton}
      >
        {theme.direction === 'ltr' &&
          (!open ? <ChevronRightIcon /> : <ChevronLeftIcon />)}
        {theme.direction === 'rtl' &&
          (!open ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
      </IconButton>
    </Drawer>
  );

  return matches ? (
    <>
      <Backdrop
        className={classes.backdrop}
        open={open}
        onClick={() => handleToggleDrawer()}
      />
      <Hammer
        onPan={({ direction }: any) => {
          handleToggleDrawer(direction);
        }}
      >
        {drawer()}
      </Hammer>
    </>
  ) : (
    drawer()
  );
};

export { Sidebar };
