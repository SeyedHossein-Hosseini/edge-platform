import momentUtils from '@date-io/moment';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField, Tooltip,
  Typography,
} from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, Cached, WifiTethering } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { default as jMoment } from 'jalali-moment';
import moment from 'moment';
import 'moment/locale/fa.js';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { IllustrationViewer } from 'src/components/static/illustration-viewer';
import { LogCard } from 'src/components/static/log-card';
import { Sticky } from 'src/components/static/sticky-wrapper';
import { clearSeconds } from 'src/helpers/date/date';
import { exportIpAddress } from 'src/helpers/strings/strings';
import { useStyle } from 'src/pages/dashboard/restricted-history/restricted-history.style';
import { AppState } from 'src/redux/store';
import { getRestrictedHistoryLogsData } from 'src/services/api/logs.api';
import { getRestrictedCamerasList } from 'src/services/api/service-config.api';
import { environment } from '../../../../environments/environment';


const RestrictedHistory = () => {
  const timePickerFormat = 'YYYY/MM/DD HH:mm';
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);

  const [ currentExtendedItem, setCurrentExtendedItem ] = useState(null);
  const [ records, setRecords ] = useState<Array<number>>([]);
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ hasServerError, setHasServerError ] = useState<boolean>(false);
  const [ currentDialogInfo, setCurrentDialogInfo ] = useState<any>({});

  const [ eventList, setEventList ] = useState({ face: 'Face', person: 'Person' });
  const [ cameraList, setCameraList ] = useState([]);
  const [ count, setCount ] = useState<number>(100);
  const [ listOrder, setListOrder ] = useState(false);

  // Filters
  const [ perPage, setPerPage ] = useState<number>(() => {
    const corrected = Math.min(Math.max(parseInt(params.get('perPage')) || 9, 5), 15);
    if (params.get('perPage')) params.set('perPage', `${corrected}`);
    return corrected;
  });
  const [ startDate, setStartDate ] = useState<moment.Moment>(params.get('start') ?
    moment(params.get('start')) :
    null);
  const [ endDate, setEndDate ] = useState<moment.Moment>(params.get('end') ?
    moment(params.get('end')) :
    null);
  const [ selectedEvent, setSelectedEvent ] = useState(params.get('event')?.split(',') ?? []);
  const [ selectedCamera, setSelectedCamera ] = useState(params.get('camera')?.split(',') ?? []);
  const [ page, setPage ] = useState<number>(parseInt(params.get('page')) || 1);

  useEffect(() => {
    moment().locale(locale);
    getRestrictedCamerasList().subscribe({
      next: (res: any) => {
        setCameraList(res);
      },
    });
  }, []);

  useEffect(() => {
    getRestrictedAreaHistory();
  }, [ page, startDate, endDate, selectedEvent, selectedCamera, listOrder, perPage ]);

  useEffect(() => {
    paginate(parseInt( params.get('page'), 10) || 1);
  }, [ startDate, endDate, selectedEvent, selectedCamera, listOrder, perPage ]);

  useEffect(() => {
    moment().locale(locale);
  }, [locale]);

  const handleChange = (e: any, pageNumber: number) => {
    paginate(pageNumber);
  };

  const addUrlParam = (param: string, paramName: string) => {
    const paramFunc = params.has(paramName) ? (
      (param && param.length > 0 && param[0]) ?
        'set' : 'delete'
    ) : 'append';
    params[paramFunc](paramName, param);
    history.push({
      pathname: `/${locale}/restricted/history`,
      search: `?${params.toString()}`,
    });
  };

  const perPageHandler = (e: any) => {
    const chosenValue = Math.min(Math.max(e.target.value, 5), 15);
    setPerPage(chosenValue);
    addUrlParam(`${chosenValue}`, 'perPage');
  };

  const logClickHandler = (index: number) => {
    (currentExtendedItem !== index) ? setCurrentExtendedItem(index) : setCurrentExtendedItem(null);
  };

  const updateImageDialog = (images: Array<any>, itemIndex: number, cameraNumber: string) => {
    const NewDialog = {
      gallery: images,
      currentImage: images[itemIndex]['thumbnail'],
      camera: cameraNumber,
      type: images[itemIndex]['type'],
      currentIndex: itemIndex,
    };
    setCurrentDialogInfo(NewDialog);
    setIsDialogOpen(true);
  };

  const nextImage = () => {
    const currentItem = { ...currentDialogInfo };
    const currentIndex = currentItem['currentIndex'];
    const galleryLength = currentItem['gallery'].length;
    if (currentIndex < galleryLength - 1) {
      currentItem['currentImage'] = currentItem['gallery'][currentIndex + 1]['thumbnail'];
      currentItem['currentIndex'] = currentItem['currentIndex'] + 1;
      currentItem['type'] = currentItem['gallery'][currentIndex + 1]['type'];
    } else {
      currentItem['currentImage'] = currentItem['gallery'][galleryLength - 1]['thumbnail'];
      currentItem['currentIndex'] = galleryLength - 1;
      currentItem['type'] = currentItem['gallery'][galleryLength - 1]['type'];
    }
    setCurrentDialogInfo(currentItem);
  };

  const prevImage = () => {
    const currentItem = { ...currentDialogInfo };
    const currentIndex = currentItem['currentIndex'];
    if (currentIndex > 0) {
      currentItem['currentImage'] = currentItem['gallery'][currentIndex - 1]['thumbnail'];
      currentItem['currentIndex'] = currentItem['currentIndex'] - 1;
      currentItem['type'] = currentItem['gallery'][currentIndex - 1]['type'];
    } else {
      currentItem['currentImage'] = currentItem['gallery'][0]['thumbnail'];
      currentItem['currentIndex'] = 0;
      currentItem['type'] = currentItem['gallery'][0]['type'];
    }
    setCurrentDialogInfo(currentItem);
  };

  const paginate = (n: number) => {
    setPage(n);
    setCurrentExtendedItem(null);
    addUrlParam(`${n}`, 'page');
  };

  const getRestrictedAreaHistory = () => {
    setLoading((prevState: boolean) => true);
    const queryParams: any = {
      page: page,
      size: perPage,
      reverse: listOrder,
      ...(endDate && { timestamp__lte: moment(endDate).add(1, 'm').toISOString() }),
      ...(startDate && { timestamp__gte: startDate.toISOString() }),
      ...(selectedCamera.length > 0 && { cameras: selectedCamera.toString() }),
      ...(selectedEvent.length > 0 && { event: selectedEvent.toString() }),
    };
    getRestrictedHistoryLogsData(queryParams).subscribe({
      next: (res: any) => {
        setLoading((prevState: boolean) => false);
        setCount((prevState: number) => {
          const recordsLength: number = (res.count !== undefined) ? Math.ceil(res.count / 10) : 100;
          return recordsLength;
        });
        setRecords(res['results']);
      },
      error: (err: Error) => {
        setLoading(false);
        setHasServerError(true);
      },
    });
  };

  return (
    <MuiPickersUtilsProvider libInstance={jMoment} utils={momentUtils} locale={locale}>
      <Box className={classes.header}>
        <Typography variant="h1">{t('restricted.logTitle')}</Typography>
        <div className={classes.headerActions}>
          <NavLink to={`/${locale}/restricted`}>
            <Tooltip title={t('general.onlineMode')}>
              <IconButton>
                <WifiTethering fontSize="default" color="primary" />
              </IconButton>
            </Tooltip>
          </NavLink>
          <Tooltip title={t('general.retry')}>
            <IconButton onClick={getRestrictedAreaHistory}>
              <Cached fontSize="default" color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
      <div className={classes.wrapper}>
        {loading &&
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <IllustrationViewer
                isLoading={true}
                title={t('general.loading')}
              />
            </Grid>
          </Grid>
        }
        {!loading && hasServerError &&
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <IllustrationViewer
                illustration={'serviceUnavailable.svg'}
                title={t('general.serverError')}
              />
            </Grid>
          </Grid>
        }
        {!loading && !hasServerError &&
          <Grid container spacing={2}>
            {records.length > 0 && records.map((item: any, index: number) =>
              <Grid item xs={12} lg={12} key={index}>
                <LogCard
                  galleryClickHandler={updateImageDialog}
                  detailsClickHandler={logClickHandler}
                  flipId={index}
                  currentExtendedItem={currentExtendedItem}
                  cameraNumber={item['stream_id']}
                  startTime={item['created_at']}
                  sessionID={item['id']}
                  gallery={item['thumbnails']}
                />
              </Grid>
            )}
            {records.length > 0 && <Pagination
              color='primary'
              showFirstButton
              showLastButton
              count={count}
              page={page}
              onChange={handleChange}
              className={classes.pagination}
            />}
            {records.length === 0 &&
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <IllustrationViewer
                    illustration={'noLog.svg'}
                    title={t('general.noDataTitle')}
                    content={t('general.changeFilter')}
                  />
                </Grid>
              </Grid>
            }
          </Grid>
        }
        <Sticky>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <DateTimePicker
                fullWidth
                label={t('restricted.startDateFilter')}
                inputVariant="outlined"
                value={startDate}
                onChange={(date) => {
                  const newDate = clearSeconds(date);
                  setStartDate(newDate);
                  addUrlParam(newDate.toISOString(), 'start');
                }}
                ampm={false}
                format={timePickerFormat}
                okLabel={t('general.ok')}
                cancelLabel={t('general.cancel')}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <DateTimePicker
                fullWidth
                label={t('restricted.endDateFilter')}
                inputVariant="outlined"
                value={endDate}
                onChange={(date) => {
                  const newDate = clearSeconds(date);
                  setEndDate(newDate);
                  addUrlParam(newDate.toISOString(), 'end');
                }}
                ampm={false}
                format={timePickerFormat}
                okLabel={t('general.ok')}
                cancelLabel={t('general.cancel')}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="selected_event">{t('restricted.eventFilter')}</InputLabel>
                <Select
                  fullWidth
                  labelId="selected_event"
                  multiple={true}
                  value={selectedEvent}
                  label={'Select Event'}
                  onChange={(event: any) => {
                    setSelectedEvent(event.target.value);
                    addUrlParam(event.target.value.join(','), 'event');
                  }}
                >
                  {Object.keys(eventList).map((keyName: keyof typeof eventList, index: number) => (
                    <MenuItem value={keyName} key={index}>{eventList[keyName]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="selected_camera">{t('restricted.cameraFilter')}</InputLabel>
                <Select
                  fullWidth
                  labelId="selected_camera"
                  multiple={true}
                  value={selectedCamera}
                  label={'Select Camera'}
                  onChange={(event: any) => {
                    setSelectedCamera(event.target.value);
                    addUrlParam(event.target.value.join(','), 'camera');
                  }}
                >
                  {cameraList.map((camera: any, index: number) => (
                    <MenuItem value={camera['id']} key={index}>{`${camera['id']} (${exportIpAddress(camera['uri'])})`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                fullWidth
                label={t('restricted.perPageFilter')}
                type="number"
                variant="outlined"
                value={perPage}
                onChange={perPageHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Sticky>
      </div>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle className={classes.dialogHeader}>
          <Typography variant='h3' component='p'><strong>{t('restricted.popupTitle')}</strong></Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Box className={classes.dialogContentDetail}>
            <Typography variant='h6' component='p'>
              {t('restricted.popupCameraNum')}: {currentDialogInfo['camera']}
            </Typography>
            {currentDialogInfo['type'] &&
              <Typography variant='h6' component='p'>
                {t('restricted.popupType')}: {currentDialogInfo['type']}
              </Typography>
            }
          </Box>
          <figure className={classes.dialogImageBox}>
            <img src={environment.UploadsBasePath + currentDialogInfo['currentImage']} className={classes.dialogImage} />
          </figure>
          {currentDialogInfo['gallery'] !== undefined &&
            <DialogActions className={classes.dialogActions}>
              <Button
                variant='outlined'
                color='primary'
                size='medium'
                startIcon={(direction === 'ltr') ? <ArrowBackIos /> : <ArrowForwardIos />}
                onClick={prevImage}
                disabled={currentDialogInfo['currentIndex'] === 0}
              >{t('restricted.popupPrevBtn')}
              </Button>
              <Button
                variant='outlined'
                color='primary'
                size='medium'
                endIcon={(direction === 'ltr') ? <ArrowForwardIos /> : <ArrowBackIos />}
                onClick={nextImage}
                disabled={currentDialogInfo['currentIndex'] === currentDialogInfo['gallery'].length - 1}
              >{t('restricted.popupNextBtn')}
              </Button>
            </DialogActions>
          }
        </DialogContent>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default RestrictedHistory;
