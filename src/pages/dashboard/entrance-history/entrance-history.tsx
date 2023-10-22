import momentUtils from '@date-io/moment';
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Cached, CheckBox, CheckBoxOutlineBlank, WifiTethering } from '@material-ui/icons';
import { Autocomplete, Pagination } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { default as jMoment } from 'jalali-moment';
import moment from 'moment';
import 'moment/locale/fa.js';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { IllustrationViewer } from 'src/components/static/illustration-viewer';
import { EntranceLogCard } from 'src/components/static/entrance-log-card';
import { Sticky } from 'src/components/static/sticky-wrapper';
import { clearSeconds } from 'src/helpers/date/date';
import { useStyle } from 'src/pages/dashboard/entrance-history/entrance-history.style';
import { AppState } from 'src/redux/store';
import { detectedFacesLogsData } from 'src/services/api/logs.api';
import { getEmployees } from 'src/services/api/personnel.api';
import { getFaceCamerasList } from 'src/services/api/service-config.api';

const EntranceHistory = () => {
  const timePickerFormat = 'YYYY/MM/DD HH:mm';
  const urlTimeFormat = 'YYYY-MM-DD-HH-mm';
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);

  const [ faceCameras, setFaceCameras ] = React.useState<any[]>([]);
  const [ employee, setEmployee ] = React.useState<any[]>([]);
  const [ records, setRecords ] = useState<Array<number>>([]);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ hasServerError, setHasServerError ] = useState<boolean>(false);
  const [ count, setCount ] = useState<number>(100);

  // Filters
  const [ selectedFaceCameras, setSelectedFaceCameras ] = React.useState<any[]>(params.get('camera')?.split(',') ?? []);
  const [ selectedEmployee, setSelectedEmployee ] = React.useState<any[]>(params.get('employee')?.split(',') ?? []);
  const [ dist, setDist ] = React.useState<number[]>(params.get('dist')?.split(',')?.map((val) => Number(val)) ?? [ 20, 80 ]);
  const [ startDate, setStartDate ] = useState<moment.Moment>(params.get('start') ? moment(params.get('start')) : null);
  const [ endDate, setEndDate ] = useState<moment.Moment>(params.get('end') ? moment(params.get('end')) : null);
  const [ page, setPage ] = useState<number>(parseInt(params.get('page')) || 1);
  const [ perPage, setPerPage ] = useState<number>(() => {
    const corrected = Math.min(Math.max(parseInt(params.get('perPage')) || 10, 5), 15);
    if (params.get('perPage')) params.set('perPage', `${corrected}`);
    return corrected;
  });

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const handleChange = (e: any, pageNumber: number) => {
    paginate(pageNumber);
  };

  const perPageHandler = (e: any) => {
    const chosenValue = Math.min(Math.max(e.target.value, 5), 15);
    setPerPage(chosenValue);
    addUrlParam(`${chosenValue}`, 'perPage');
  };

  const addUrlParam = (param: string, paramName: string) => {
    const paramFunc = params.has(paramName) ? (
      (param && param.length > 0 && param[0]) ?
        'set' : 'delete'
    ) : 'append';
    params[paramFunc](paramName, param);
    history.push({
      pathname: `/${locale}/entrance/history`,
      search: `?${params.toString()}`,
    });
  };

  const paginate = (n: number) => {
    setPage(n);
    addUrlParam(`${n}`, 'page');
  };

  const filterEmployeeByLastName = (search: string) => {
    getEmployeeList(10, search);
  };

  const getEntranceRecords = () => {
    let selectedEmployeeId: Array<string> = [];
    setLoading((prevState: boolean) => true);
    selectedEmployee.forEach((item: any) => {
      selectedEmployeeId = [ ...selectedEmployeeId, item['id'] ];
    });
    const queryParams: any = {
      size: perPage,
      page: page,
      dist__gte: dist[0] / 100,
      dist__lte: dist[1] / 100,
      ...(startDate && { timestamp__gte: startDate.toISOString() }),
      ...(endDate && { timestamp__lte: moment(endDate).add(1, 'm').toISOString() }),
      ...(selectedEmployee.length > 0 && { user_id: selectedEmployeeId.toString() }),
      ...(selectedFaceCameras.length > 0 && { cameras: selectedFaceCameras.toString() }),
    };
    detectedFacesLogsData(queryParams).subscribe({
      next: (res: any) => {
        setLoading((prevState: boolean) => false);
        setCount((prevState: number) => {
          const recordsLength: number = (res.count !== undefined) ? Math.ceil(res.count / perPage) : 100;
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

  const getFaceCameraList = () => {
    getFaceCamerasList().subscribe({
      next: (cameras: any) => {
        setFaceCameras(cameras);
      },
      error: (err: Error) => setFaceCameras([]),
    });
  };

  const getEmployeeList = (size: number, search?: string) => {
    const options = {
      size,
      ...(search !== undefined && { last_name: search }),
    };
    getEmployees(options).subscribe({
      next: (personnel: any) => {
        setEmployee(personnel['results']);
      },
      error: (err: Error) => setEmployee([]),
    });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      getEntranceRecords();
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [ page, startDate, endDate, perPage, dist, selectedEmployee, selectedFaceCameras ]);

  useEffect(() => {
    paginate(parseInt( params.get('page'), 10) || 1);
  }, [ startDate, endDate, perPage, dist, selectedEmployee, selectedFaceCameras ]);

  useEffect(() => {
    moment().locale(locale);
    getEmployeeList(10);
    getFaceCameraList();
  }, []);

  useEffect(() => {
    moment.locale(locale);
  }, [locale]);

  return (
    <MuiPickersUtilsProvider libInstance={jMoment} utils={momentUtils} locale={locale}>
      <Box className={classes.header}>
        <Typography variant="h1">{t('personnel.personnelTitle')}</Typography>
        <div className={classes.headerActions}>
          <NavLink to={`/${locale}/entrance`}>
            <Tooltip title={t('general.onlineMode')}>
              <IconButton>
                <WifiTethering fontSize="default" color="primary" />
              </IconButton>
            </Tooltip>
          </NavLink>
          <Tooltip title={t('general.retry')}>
            <IconButton onClick={getEntranceRecords}>
              <Cached fontSize="default" color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </Box>
      <div className={classes.wrapper}>
        {loading &&
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <IllustrationViewer isLoading={true} title={t('personnel.loading')} />
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
                <EntranceLogCard
                  avatar={'http://10.21.23.174:8000' + item['log']['employee']['avatar']}
                  cameraName={item['stream_id']}
                  firstName={item['log']['employee']['first_name']}
                  lastName={item['log']['employee']['last_name']}
                  time={item['timestamp']}
                  detectedFace={item['log']['file_name']}
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
              <IllustrationViewer
                illustration={'emptyBox.svg'}
                title={t('personnel.noDataTitle')}
                content={t('personnel.noDataSubtitle')}
              />
            }
          </Grid>
        }
        <Sticky>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <DateTimePicker
                fullWidth
                ampm={false}
                label={t('personnel.startDateFilter')}
                inputVariant="outlined"
                value={startDate}
                onChange={(date) => {
                  const newDate = clearSeconds(date);
                  setStartDate(newDate);
                  addUrlParam(newDate.toISOString(), 'start');
                }}
                format={timePickerFormat}
                okLabel={t('general.ok')}
                cancelLabel={t('general.cancel')}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <DateTimePicker
                fullWidth
                ampm={false}
                label={t('personnel.endDateFilter')}
                inputVariant="outlined"
                value={endDate}
                onChange={(date) => {
                  const newDate = clearSeconds(date);
                  setEndDate(newDate);
                  addUrlParam(newDate.toISOString(), 'end');
                }}
                format={timePickerFormat}
                okLabel={t('general.ok')}
                cancelLabel={t('general.cancel')}
              />
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
            <Grid item xs={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <Autocomplete
                  fullWidth
                  multiple
                  id="selected_employee"
                  value={selectedEmployee}
                  options={employee}
                  disableCloseOnSelect
                  onInputChange={(_, value: string,) => filterEmployeeByLastName(value)}
                  filterOptions={(x) => x}
                  filterSelectedOptions
                  getOptionLabel={(option) => option['last_name']}
                  onChange={(event: any, newValue) => setSelectedEmployee(newValue)}// TODO: Add to Query Params
                  renderOption={(option, { selected }) => (
                    <>
                      <Checkbox
                        icon={<CheckBoxOutlineBlank fontSize="small" />}
                        checkedIcon={<CheckBox fontSize="small" />}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option['last_name']}
                    </>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={t('personnel.employeeFilter')}
                      placeholder={t('personnel.employeeFilter')}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="selected_camera">{t('personnel.cameraFilter')}</InputLabel>
                <Select
                  fullWidth
                  labelId="selected_camera"
                  multiple={true}
                  value={selectedFaceCameras}
                  MenuProps={MenuProps}
                  label={t('personnel.cameraFilter')}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                  onChange={(event: any) => {
                    setSelectedFaceCameras(event.target.value);
                    addUrlParam(event.target.value, 'camera');
                  }}
                >
                  {faceCameras.map((item: any, index: number) => (
                    <MenuItem value={item['id']} key={index}>
                      <Checkbox checked={selectedFaceCameras.indexOf(item['id']) > -1} />
                      <ListItemText primary={item['id']} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Slider
                value={dist}
                min={10}
                max={100}
                step={10}
                onChange={(event: any, newValue: number[]) => {
                  setDist(newValue as number[]);
                  addUrlParam(newValue.join(','), 'dist');
                }}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </Grid>
          </Grid>
        </Sticky>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default EntranceHistory;
