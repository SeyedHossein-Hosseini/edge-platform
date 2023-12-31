import { Box, Button, Dialog, DialogActions, Typography } from '@material-ui/core';
import { useIdle } from '@react-corekit/use-idle';
import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Timer from 'src/components/static/timer';
import { localStore } from 'src/helpers/storage-helper';
import actions from 'src/redux/appSetting/actions';
import { AppState } from 'src/redux/store';
import * as userActions from 'src/redux/user/actions';
import { getProfile } from 'src/services/api/user.api';
import { Appbar } from './appbar/appbar';
import { LayoutProps } from './layout.interface';
import { useStyle } from './layout.style';
import { Sidebar } from './sidebar';

const totalSeconds = 20;
const initialSeconds = 0;
const initialProgress = (initialSeconds / totalSeconds) * 100;
const drawerWidth = 260;
const options: any = {
  timeToIdle: (1200 * 1000), // Twenty Minutes
  ignoredEventsWhenIdle: [ 'focus', 'mousemove' ],
  inactivityEvents: [],
  activityEvents: [ 'click', 'mousemove', 'keydown', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'focus' ],
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const idleState = useIdle(options);
  const [ idlePopup, setIdlePopup ] = useState(false);
  const [ elapsedSeconds, setElapsedSeconds ] = useState(0);
  const [ progress, setProgress ] = useState(initialProgress);
  const [ userName, setUserName ] = useState('');
  const { isIdle } = useSelector((state: AppState) => state.AppSetting);

  useEffect(() => {
    dispatch(actions.setIsIdle(idleState));
  }, [idleState]);

  useEffect(() => {
    if (!isIdle) {
      setIdlePopup(false);
    } else {
      setIdlePopup(true);
    }
  }, [isIdle]);

  // Call When Counter is End!
  useEffect(() => {
    if (elapsedSeconds === 0) {
      setTimeout(() => {
        closeIdlePopup();
      }, 1000);
    }
  }, [elapsedSeconds]);

  useEffect(() => {
    getProfile().subscribe({
      next: (res: any) => {
        dispatch(userActions.default.setUserInfo({
          token: localStore.get('token'),
          firstName: res['data']['first_name'],
          avatar: res['data']['avatar'],
        }));
      },
    });
  }, []);

  const closeIdlePopup = () => {
    setIdlePopup(false);
    dispatch(actions.setIsIdle(false));
  };

  const roundProgress = (progress: number) => {
    const factor = Math.pow(10, 2);
    return Math.round(progress * factor) / factor;
  };

  const handleTimer = (elapsedSeconds: number) => {
    const progress = roundProgress(((elapsedSeconds + initialSeconds) / totalSeconds) * 100);
    setProgress(progress);
    setElapsedSeconds(totalSeconds - elapsedSeconds);
  };

  return (
    <>
      <Appbar drawerWidth={drawerWidth} />
      <Sidebar width={drawerWidth} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>

      <Dialog
        open={idlePopup}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <Box className={classes.countDown}>
          <ProgressBar
            radius={100}
            progress={progress}
            strokeWidth={3}
            strokeColor="indianred"
            trackStrokeWidth={3}
            trackStrokeColor="#e6e6e6"
            pointerRadius={5}
            pointerFillColor="white"
            pointerStrokeWidth={2}
            pointerStrokeColor="indianred"
          >
            <div className={classes.counterText}>
              <span>{elapsedSeconds}</span>
            </div>
            <Timer
              initialSeconds={initialSeconds}
              totalSeconds={totalSeconds}
              onChange={handleTimer}
              interval={1000}
            />
          </ProgressBar>
        </Box>
        <Typography className={classes.counterTitle} component="h4">{t('idle.idleTitle')}</Typography>
        <Typography className={classes.counterMessage} component="p">{t('idle.idleSubtitle')}</Typography>
        <DialogActions className={classes.counterActions}>
          <Button variant="contained" color="primary" onClick={closeIdlePopup}>{t('idle.idleBtn')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Layout;
