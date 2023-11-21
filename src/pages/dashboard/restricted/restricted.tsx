import momentUtils from '@date-io/moment';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton, Tooltip,
  Typography,
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, History } from '@material-ui/icons';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'jalali-moment';
import 'moment/locale/fa';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { IllustrationViewer } from 'src/components/static/illustration-viewer';
import { RestrictedLogCard } from 'src/components/static/restricted-log-card';
import { useStyle } from 'src/pages/dashboard/restricted/restricted.style';
import { AppState } from 'src/redux/store';
import { getRestrictedLiveSessionGallery } from 'src/services/api/logs.api';
import { getRestrictedCamerasList } from 'src/services/api/service-config.api';
import { WebSocketConnection } from 'src/services/web-socket/web-socket';
import { environment } from '../../../../environments/environment';

const Restricted = () => {
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);

  const [ galleryIndex, setGalleryIndex ] = useState<number>(0);
  const [ isSocketConnected, setIsSocketConnected ] = useState(false);
  const [ socketInstance, setSocketInstance ] = useState(null);
  const [ restrictedObject, setRestrictedObject ] = useState<any>({});
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);
  const [ currentDialogInfo, setCurrentDialogInfo ] = useState<any>([]);

  /** Create Socket Instance When Component Initial **/
  useEffect(() => {
    getRestrictedCamerasList().subscribe({
      next: (res: any) => {
        let restrictedTemp = {};
        res.forEach((camera: any, index: number) => {
          restrictedTemp = {
            ...restrictedTemp, [camera.id]: {
              status: 'safe',
              stream_id: camera.id,
              session_id: '',
              timestamp: '',
            },
          };
        });
        setRestrictedObject(restrictedTemp);
      },
    });

    if (isSocketConnected) return;
    setSocketInstance(
        new WebSocketConnection<any>({ baseURL: environment.socketAddress + 'restricted/' })
    );
  }, []);

  /** Listen To Socket After Socket Instance Create **/
  useEffect(() => {
    if (socketInstance !== null) {
      socketInstance.onSocketOpened(() => {
        setIsSocketConnected(true);
      });

      socketInstance.onSocketMessage((res: any) => {
        const log = JSON.parse(res.data);
        setRestrictedObject((prevRecords: any) => {
          return { ...prevRecords, [log['stream_id']]: log };
        });
      });

      // Set Socket Instance as null
      socketInstance.onSocketClosed(() => {
        socketInstance.closeConnection();
        setSocketInstance(null);
      });
    } else {
      // ReConnect To Socket End Point
      setSocketInstance(
          new WebSocketConnection<any>({ baseURL: environment.socketAddress + 'restricted/' })
      );
    }
  }, [socketInstance]);

  useEffect(() => {
    moment().locale(locale);
  }, [direction]);

  const closeDialog = () => {
    setGalleryIndex(0);
    setIsDialogOpen(false);
    setCurrentDialogInfo([]);
  };

  const nextImage = () => {
    setGalleryIndex((prevIndex) => (prevIndex === currentDialogInfo.length) ? currentDialogInfo.length : prevIndex + 1);
  };

  const prevImage = () => {
    setGalleryIndex((prevIndex) => (prevIndex === 0) ? 0 : prevIndex - 1);
  };

  const galleryHandler = (sessionId: string) => {
    getRestrictedLiveSessionGallery({ 'session_id': sessionId, 'after': 1 }).subscribe((res: any) => {
      setCurrentDialogInfo(res['data']);
      setIsDialogOpen(true);
    });
  };

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h1">{t('restricted.logTitle')}</Typography>
        <div className={classes.headerActions}>
          <NavLink to={`/${locale}/restricted/history`}>
            <Tooltip title={t('general.historyMode')}>
              <IconButton>
                <History fontSize="default" color="primary" />
              </IconButton>
            </Tooltip>
          </NavLink>
        </div>
      </Box>
      <div className={classes.wrapper}>
        <Grid container spacing={2}>
          {Object.keys(restrictedObject).length > 0 && Object.keys(restrictedObject).map((item: any, index: number) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <RestrictedLogCard
                status={restrictedObject[item]['status']}
                cameraName={restrictedObject[item]['stream_id']}
                cameraSession={restrictedObject[item]['session_id']}
                eventType={'Face'}
                timeStamp={restrictedObject[item]['timestamp']}
                imageBtnHandler={galleryHandler}
              />
            </Grid>
          )}
          {Object.keys(restrictedObject).length === 0 &&
            <Grid item xs={12}>
              <IllustrationViewer illustration={'noLog.svg'} title={'general.noDataTitle'} content={'general.noDataContent'} />
            </Grid>
          }
        </Grid>
      </div>

      {currentDialogInfo.length > 0 &&
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle className={classes.dialogHeader}>
            <Typography variant='h3' component='p'><strong>{t('restricted.popupTitle')}</strong></Typography>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Box className={classes.dialogContentDetail}>
              <Typography variant='h6' component='p'>
                {t('restricted.popupType')}: {currentDialogInfo[galleryIndex]['type']}
              </Typography>
            </Box>
            <figure className={classes.dialogImageBox}>
              <img src={environment.UploadsBasePath + currentDialogInfo[galleryIndex]['thumbnail']} className={classes.dialogImage} />
            </figure>
            {currentDialogInfo.length > 1 &&
              <DialogActions className={classes.dialogActions}>
                <Button
                  variant='outlined'
                  color='primary'
                  size='medium'
                  startIcon={(direction === 'ltr') ? <ArrowBackIos /> : <ArrowForwardIos />}
                  onClick={prevImage}
                  disabled={galleryIndex === 0}
                >{t('restricted.popupPrevBtn')}
                </Button>
                <Button
                  variant='outlined'
                  color='primary'
                  size='medium'
                  endIcon={(direction === 'ltr') ? <ArrowForwardIos /> : <ArrowBackIos />}
                  onClick={nextImage}
                  disabled={galleryIndex === currentDialogInfo.length - 1}
                >{t('restricted.popupNextBtn')}
                </Button>
              </DialogActions>
            }
          </DialogContent>
        </Dialog>
      }
    </>
  );
};

export default Restricted;
