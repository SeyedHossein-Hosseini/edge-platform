import {
  AppBar, Box, Dialog, IconButton, Paper, Portal, Toolbar,
  Typography,
} from '@material-ui/core';
import { Close, Delete, Fullscreen, MoreVert } from '@material-ui/icons';
import clsx from 'clsx';
import React, {
  forwardRef, useEffect, useImperativeHandle, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { PopperMenu } from 'src/components/share/menu-popper';
import { IMenuItem } from 'src/components/share/menu-popper/menu-popper.interface';
import actions from 'src/redux/actions';
import {
  CardWidgetProps,
  ConfigProps,
} from './card-widget.props';
import { useStyle } from './card-widget.style';

const CardWidget = <P extends CardWidgetProps>(
  Wrapped: React.ComponentType<P>,
  config?: ConfigProps
) =>
    forwardRef((props: P, ref) => {
      const classes = useStyle({ centerContent: config?.centerContent || false });
      const dispatch = useDispatch();
      const { t } = useTranslation();

      const [ modalRef, setModalRef ] = useState<HTMLDivElement>();
      const [ cardRef, setCardRef ] = useState<HTMLDivElement>();
      const [ title, setTitle ] = useState<string>();
      const [ fullHeight, setFullHeight ] = useState<boolean>();
      const [ menuItems, setMenuItems ] = useState<IMenuItem[]>();
      const [ initialHeight, setInitialHeight ] = useState<number>();
      const [ fullScreenHeight, setFullScreenHeight ] = useState<number>();
      const [ showInFullscreenView, setShowInFullscreenView ] = useState(false);
      const [ popperMenuItems, setPopperMenuItems ] = useState<IMenuItem[]>([]);

      useEffect(() => {
        if (modalRef) {
          setFullScreenHeight(modalRef.clientHeight);
        }
      }, [modalRef]);

      useEffect(() => {
        if (cardRef && !initialHeight) {
          setInitialHeight(cardRef.clientHeight);
        }
      }, [cardRef]);

      useEffect(() => {
        const defaultMenu = [
          {
            icon: Fullscreen,
            label: 'widget.fullscreen',
            clickHandler: toggleView,
          },
          {
            icon: Delete,
            clickHandler: removeWidget,
            label: 'widget.remove',
          },
        ];
        if (menuItems) {
          setPopperMenuItems([ ...defaultMenu, ...menuItems ]);
        } else {
          setPopperMenuItems([...defaultMenu]);
        }
      }, [menuItems]);

      useImperativeHandle(ref, () => ({
        getId() {
          return props.id;
        },
        getGridConfig() {
          return getGridConfig(props.id);
        },
      }));

      const toggleView = () => setShowInFullscreenView(!showInFullscreenView);

      const getGridConfig = (id: string) => {
        let newConf = Object.keys(config.breakPoints).reduce(
            (init, bp: keyof ConfigProps[ 'breakPoints' ]) => ({
              ...init,
              [bp]: { ...config.breakPoints[bp], i: id },
            }),
            {}
        );

        if (props.isAdded) {
          newConf = Object.keys(config.breakPoints).reduce(
              (init, bp: keyof ConfigProps[ 'breakPoints' ]) => ({
                ...init,
            // @ts-ignore
                [bp]: { ...newConf[bp], x: 0, y: Infinity },
              }),
              {}
          );
        }

        return newConf;
      };

      const removeWidget = () => {
        const widgetId = props.id;
        dispatch(actions.AppSetting.removeWidgetOfDashboard(widgetId));
      };

      const renderFullScreen = () => (
        <Portal>
          <Dialog fullScreen open={showInFullscreenView} onClose={toggleView}>
            <AppBar>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toggleView}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
                <Typography variant="h6">{t(title)}</Typography>
              </Toolbar>
            </AppBar>
            <div ref={(el) => setModalRef(el)} className={classes.content}>
              <Wrapped
                {...(props as P)}
                height={fullScreenHeight}
                setTitle={setTitle}
                setMenuItems={setMenuItems}
                setFullHeight={setFullHeight}
              />
            </div>
          </Dialog>
        </Portal>
      );

      const renderCardView = () => (
        <Paper
          className={clsx([ classes.paper, { [classes.fullHeight]: fullHeight }])}
          elevation={0}
        >
          <Box className={clsx([ classes.header, 'grid_handle' ])}>
            <Typography variant="h5" display="inline">
              {t(title)}
            </Typography>

            <PopperMenu icon={MoreVert} items={popperMenuItems} />
          </Box>
          <div ref={(el) => setCardRef(el)} className={classes.content}>
            <Wrapped
              {...(props as P)}
              height={initialHeight}
              setTitle={setTitle}
              setMenuItems={setMenuItems}
              setFullHeight={setFullHeight}
            />
          </div>
        </Paper>
      );

      return showInFullscreenView ? renderFullScreen() : renderCardView();
    });

export { CardWidget };
