import momentUtils from '@date-io/moment';
import {
  Box,
  Checkbox, Dialog, DialogContent, DialogTitle,
  FormControl,
  Grid, IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField, Tooltip,
  Typography,
} from '@material-ui/core';
import { Cached, WifiTethering } from '@material-ui/icons';
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
import { LicensePlateCard } from 'src/components/static/license-plate-card';
import { Sticky } from 'src/components/static/sticky-wrapper';
import licensePlateCategories from 'src/dump/plate-categories.dump';
import licensePlateCityCategories from 'src/dump/plate-city-categories.dump';
import { clearSeconds } from 'src/helpers/date/date';
import { AppState } from 'src/redux/store';
import { detectedLicensePlatesLogsData } from 'src/services/api/logs.api';
import { getLicensePlateCamerasList } from 'src/services/api/service-config.api';
import { environment } from '../../../../environments/environment';
import { useStyle } from './license-plate-history.style';


const LicensePlateHistory = () => {
  const timePickerFormat = 'YYYY/MM/DD HH:mm';
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);

  const [ currentDialogInfo, setCurrentDialogInfo ] = useState<any>({});
  const [ licenses, setLicenses ] = useState<any[]>([]);
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ hasServerError, setHasServerError ] = useState<boolean>(false);
  const [ count, setCount ] = useState<number>(100);
  const [ cameraList, setCameraList ] = useState([]);
  const [ categoryList, setCategoryList ] = useState([]);
  const [ cityList, setCityList ] = useState([]);

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
  const [ selectedCamera, setSelectedCamera ] = useState<any[]>(params.get('camera')?.split(',') ?? []);
  const [ page, setPage ] = useState<number>(parseInt(params.get('page')) || 1);
  const [ selectedCategory, setSelectedCategory ] = useState<any[]>(params.get('category')?.split(',') ?? []);
  const [ selectedCity, setSelectedCity ] = useState<any[]>(params.get('city')?.split(',') ?? []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const addUrlParam = (param: string, paramName: string) => {
    const paramFunc = params.has(paramName) ? (
      (param && param.length > 0 && param[0]) ?
        'set' : 'delete'
    ) : 'append';
    params[paramFunc](paramName, param);
    history.push({
      pathname: `/${locale}/license-plate/history`,
      search: `?${params.toString()}`,
    });
  };

  const paginate = (n: number) => {
    setPage(n);
    addUrlParam(`${n}`, 'page');
  };

  const perPageHandler = (e: any) => {
    const chosenValue = Math.min(Math.max(e.target.value, 5), 15);
    setPerPage(chosenValue);
    addUrlParam(`${chosenValue}`, 'perPage');
  };

  const handleChange = (e: any, pageNumber: number) => {
    paginate(pageNumber);
  };

  const licensePlatePreviewHandler = (image: string) => {
    setCurrentDialogInfo({ image });
    setIsDialogOpen(true);
  };

  const getLicensePlateHistory = () => {
    setLoading((prevState: boolean) => true);
    const queryParams: any = {
      page: page,
      size: perPage,
      ...(startDate && { timestamp__gte: startDate.toISOString() }),
      ...(endDate && { timestamp__lte: moment(endDate).add(1, 'm').toISOString() }),
      ...(selectedCamera.length > 0 && { cameras: selectedCamera.toString() }),
      ...(selectedCity.length > 0 && { city: selectedCity.toString() }),
      ...(selectedCategory.length > 0 && { type: selectedCategory.toString() }),
    };
    detectedLicensePlatesLogsData(queryParams).subscribe({
      next: (res: any) => {
        setLoading((prevState: boolean) => false);
        setCount((prevState: number) => {
          const recordsLength: number = (res.count !== undefined) ? Math.ceil(res.count / 10) : 100;
          return recordsLength;
        });
        setLicenses(res['results']);
      },
      error: (err: Error) => {
        setLoading(false);
        setHasServerError(true);
      },
    });
  };

  useEffect(() => {
    getLicensePlateHistory();
  }, [ page, startDate, endDate, selectedCamera, perPage, selectedCity, selectedCategory ]);

  useEffect(() => {
    paginate(parseInt( params.get('page'), 10) || 1);
  }, [ startDate, endDate, selectedCamera, perPage, selectedCity, selectedCategory ]);

  useEffect(() => {
    moment().locale(locale);
  }, [locale]);

  useEffect(() => {
    const categoryTemp: any[] = [];
    const cityTemp: any[] = [];
    moment().locale(locale);
    Object.keys(licensePlateCategories).map((item: keyof typeof licensePlateCategories, index: number) => {
      categoryTemp.push({ key: item, value: licensePlateCategories[item] });
    });
    setCategoryList(categoryTemp);

    Object.keys(licensePlateCityCategories).map((item: keyof typeof licensePlateCityCategories, index: number) => {
      cityTemp.push({ key: item, value: licensePlateCityCategories[item] });
    });
    setCityList(cityTemp);

    getLicensePlateCamerasList().subscribe({
      next: (cameras: any) => {
        setCameraList(cameras);
      },
      error: (err: Error) => setCameraList([]),
    });
  }, []);

  return (
    <MuiPickersUtilsProvider libInstance={jMoment} utils={momentUtils} locale={locale}>
      <Box className={classes.header}>
        <Typography variant="h1">{t('licensePlate.licensePlateHistoryTitle')}</Typography>
        <div className={classes.headerActions}>
          <NavLink to={`/${locale}/license-plate`}>
            <Tooltip title={t('general.onlineMode')}>
              <IconButton>
                <WifiTethering fontSize="default" color="primary" />
              </IconButton>
            </Tooltip>
          </NavLink>
          <Tooltip title={t('general.retry')}>
            <IconButton onClick={getLicensePlateHistory}>
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
            {licenses.length > 0 && licenses.map((license: any, index: number) => {
              if (license['log']['number'].length === 7) {
                return (
                  <Grid item xs={12} lg={12} key={index}>
                    <LicensePlateCard
                      licenseID={license['log']['number']}
                      flag={'IR'}
                      char={license['log']['char']}
                      timestamp={license['created_at']}
                      streamId={license['stream_id']}
                      image={license['log']['image']}
                      imagePreviewHandler={licensePlatePreviewHandler}
                    />
                  </Grid>
                );
              }
            })}
            {licenses.length > 0 && <Pagination
              color='primary'
              showFirstButton
              showLastButton
              count={count}
              page={page}
              onChange={handleChange}
              className={classes.pagination}
            />}
            {licenses.length === 0 &&
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
                label={t('personnel.startDateFilter')}
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
                label={t('personnel.endDateFilter')}
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
                <InputLabel id="selected_camera">{t('personnel.cameraFilter')}</InputLabel>
                <Select
                  fullWidth
                  labelId="selected_camera"
                  multiple={true}
                  value={selectedCamera}
                  MenuProps={MenuProps}
                  label={t('personnel.cameraFilter')}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                  onChange={(event: any) => {
                    setSelectedCamera(event.target.value);
                    addUrlParam(event.target.value.join(','), 'camera');
                  }}
                >
                  {cameraList.map((item: any, index: number) => (
                    <MenuItem value={item['id']} key={index}>
                      <Checkbox checked={selectedCamera.indexOf(item['id']) > -1} />
                      <ListItemText primary={item['id']} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="selected_category">{t('licensePlate.categoryFilter')}</InputLabel>
                <Select
                  fullWidth
                  labelId="selected_category"
                  multiple={true}
                  value={selectedCategory}
                  MenuProps={MenuProps}
                  label={t('licensePlate.categoryFilter')}
                  renderValue={(selected) => {
                    const renderValue: Array<string> = [];
                    (selected as string[]).forEach((cat: keyof typeof licensePlateCategories) => {
                      renderValue.push(licensePlateCategories[cat]['title']);
                    });
                    return renderValue.join(', ');
                  }}
                  onChange={(event: any) => {
                    setSelectedCategory(event.target.value);
                    addUrlParam(event.target.value.join(','), 'category');
                  }}
                >
                  {categoryList.map((item: any, index: number) => (
                    <MenuItem value={item['key']} key={index}>
                      <Checkbox checked={selectedCategory.indexOf(item['key']) > -1} />
                      <ListItemText primary={item['value']['title']} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="selected_city">{t('licensePlate.cityFilter')}</InputLabel>
                <Select
                  fullWidth
                  labelId="selected_city"
                  multiple={true}
                  value={selectedCity}
                  MenuProps={MenuProps}
                  label={t('licensePlate.cityFilter')}
                  renderValue={(selected) => {
                    const renderValue: Array<string> = [];
                    (selected as string[]).forEach((city: keyof typeof licensePlateCityCategories) => {
                      renderValue.push(licensePlateCityCategories[city]['title']);
                    });
                    return renderValue.join(', ');
                  }}
                  onChange={(event: any) => {
                    setSelectedCity(event.target.value);
                    addUrlParam(event.target.value.join(','), 'city');
                  }}
                >
                  {cityList.map((item: any, index: number) => (
                    <MenuItem value={item['key']} key={index}>
                      <Checkbox checked={selectedCity.indexOf(item['key']) > -1} />
                      <ListItemText primary={item['value']['title']} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <TextField
                fullWidth
                label={t('personnel.perPageFilter')}
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
          <figure className={classes.dialogImageBox}>
            <img src={environment.UploadsBasePath + currentDialogInfo['image']} className={classes.dialogImage} />
          </figure>
        </DialogContent>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default LicensePlateHistory;
