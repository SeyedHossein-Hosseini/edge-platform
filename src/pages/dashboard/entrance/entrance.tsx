import {
  Box, Checkbox, FormControl, Grid,
  IconButton, InputLabel, ListItemText, MenuItem, Select, Slider, TextField, Tooltip, Typography,
} from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank, History, ViewColumn, ViewStream } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { EntranceCard } from 'src/components/static/entrance-card';
import { IllustrationViewer } from 'src/components/static/illustration-viewer';
import { Sticky } from 'src/components/static/sticky-wrapper';
import { EntranceLogInterface } from 'src/interfaces/entrance-log.interface';
import { useStyle } from 'src/pages/dashboard/entrance/entrance.style';
import { AppState } from 'src/redux/store';
import { getEmployees } from 'src/services/api/personnel.api';
import { getFaceCamerasList } from 'src/services/api/service-config.api';
import { WebSocketConnection } from 'src/services/web-socket/web-socket';
import { environment } from '../../../../environments/environment';

const Entrance = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const { locale } = useSelector((state: AppState) => state.AppSetting);

  const [ isSocketConnected, setIsSocketConnected ] = useState(false);
  const [ socketInstance, setSocketInstance ] = useState(null);
  const [ flipperData, setFlipperData ] = useState([]);
  const [ personnelByCamera, setPersonnelByCamera ] = useState<any>({});
  const [ personnelObject, setPersonnelObject ] = useState<any>({});
  const [ filteredPersonnelObject, setFilteredPersonnelObject ] = useState<any>({});
  const [ isCardHorizontal, setIsCardHorizontal ] = useState<boolean>(false);
  const [ value, setValue ] = React.useState<number>(10);
  const [ selectedFaceCameras, setSelectedFaceCameras ] = React.useState<any[]>([]);
  const [ faceCameras, setFaceCameras ] = React.useState<any[]>([]);
  const [ employee, setEmployee ] = React.useState<any[]>([]);
  const [ selectedEmployee, setSelectedEmployee ] = React.useState<any[]>([]);
  const [ selectedEmployeeId, setSelectedEmployeeId ] = React.useState<string[]>([]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  useEffect(() => {
    getFaceCameraList();
    getEmployeeList(10);

    if (isSocketConnected) return;
    setSocketInstance(
        new WebSocketConnection<any>({ baseURL: environment.socketAddress + 'face_recognition_log/' })
    );
  }, []);

  useEffect(() => {
    if (socketInstance !== null) {
      socketInstance.onSocketOpened(() => {
        setIsSocketConnected(true);
      });

      socketInstance.onSocketMessage((res: any) => {
        const log = JSON.parse(res.data);
        if (log['employee'] === null || log['employee'] === undefined) return;
        handleSocketMessage(log);
      });

      // Set Socket Instance as null
      socketInstance.onSocketClosed(() => setSocketInstance(null));
    } else {
      // ReConnect To Socket End Point
      setSocketInstance(
          new WebSocketConnection<any>({ baseURL: environment.socketAddress + 'face_recognition_log/' })
      );
    }
  }, [socketInstance]);

  useEffect(() => {
    const filteredPersonnelTemp: any = {};
    Object.keys(personnelObject).map((item: string, index: number) => {
      if (personnelObject[item]['confidence'] > value) {
        if (selectedFaceCameras.indexOf(personnelObject[item]['streamNumber']) > -1 || selectedFaceCameras.length === 0) {
          if (selectedEmployeeId.indexOf(personnelObject[item]['profileID']) > -1 || selectedEmployeeId.length === 0) {
            filteredPersonnelTemp[item] = personnelObject[item];
          }
        }
      }
    });
    setFilteredPersonnelObject(() => filteredPersonnelTemp);
  }, [ personnelObject, value, selectedFaceCameras, selectedEmployeeId ]);

  useEffect(() => {
    let selectedEmployeeId: Array<string> = [];
    selectedEmployee.forEach((item: any) => {
      selectedEmployeeId = [ ...selectedEmployeeId, item['id'] ];
    });
    setSelectedEmployeeId(selectedEmployeeId);
  }, [selectedEmployee]);

  useEffect(() => {
    const sortedFilteredPersonnelObject = Object.entries(filteredPersonnelObject).sort((a: any, b: any) => {
      if (a[1]['timestamp'] > b[1]['timestamp']) {
        return -1;
      }
      if (a[1]['timestamp'] < b[1]['timestamp']) {
        return 1;
      }
      return 0;
    });
    setFlipperData(sortedFilteredPersonnelObject.map((x) => x[0]));
  }, [filteredPersonnelObject]);

  useEffect(() => {
    const tempPersonnelObject: any = {};
    Object.keys(personnelByCamera).forEach((cameraName: string) => {
      Object.keys(personnelByCamera[cameraName]).forEach((userId: string) => {
        if (tempPersonnelObject[userId] === undefined) {
          if (personnelByCamera[cameraName][userId]['counter'] > 2) {
            tempPersonnelObject[userId] = personnelByCamera[cameraName][userId];
          }
        } else {
          const prevUserTime = new Date(tempPersonnelObject[userId]['timestamp']).getTime();
          const currentUserTime = new Date(personnelByCamera[cameraName][userId]['timestamp']).getTime();
          if (currentUserTime - prevUserTime > 5000 && personnelByCamera[cameraName][userId]['counter'] > 2) {
            tempPersonnelObject[userId] = personnelByCamera[cameraName][userId];
          }
        }
      });
    });
    setPersonnelObject((prevPersonnel: any) => {
      return { ...prevPersonnel, ...tempPersonnelObject };
    });
  }, [personnelByCamera]);

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

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleSocketMessage = (log: any) => {
    const tempPersonByCamera: any = {};
    const employee: EntranceLogInterface = {
      'confidence': Math.floor(log['dist'] * 100),
      'maxConfidence': Math.floor(log['dist'] * 100),
      'avatarURL': log['employee']['avatar'],
      'firstName': log['employee']['first_name'],
      'lastName': log['employee']['last_name'],
      'streamNumber': log['stream_id'],
      'timestamp': log['timestamp'],
      'profileID': log['employee']['id'],
      'counter': 1,
    };
    setPersonnelByCamera((prevRecords: any) => {
      const currentEmployeeID = log['employee']['id'];
      const currentCameraID = log['stream_id'];

      // Check Camera Object Is Exist Or Not
      if (prevRecords[currentCameraID] === undefined) {
        tempPersonByCamera[currentCameraID] = { [currentEmployeeID]: employee };
      } else {
        if (prevRecords[currentCameraID][currentEmployeeID] === undefined) {
          tempPersonByCamera[currentCameraID] = { ...prevRecords[currentCameraID], [currentEmployeeID]: employee };
        } else {
          const currentConfidence: number = Math.floor(log['dist'] * 100);
          const maximumConfidence: number = Math.max(prevRecords[currentCameraID][currentEmployeeID]['maxConfidence'], currentConfidence);
          const currentTimeStamp: any = new Date(log['timestamp']);
          const prevTimeStamp: any = new Date(prevRecords[currentCameraID][currentEmployeeID]['timestamp']);

          // Update Counter If TimeStamp Difference More Than 3000ms
          if (currentTimeStamp - prevTimeStamp < 3000) {
            tempPersonByCamera[currentCameraID] = {
              ...prevRecords[currentCameraID], [currentEmployeeID]: {
                ...employee,
                'counter': prevRecords[currentCameraID][currentEmployeeID]['counter'] + 1,
                'timestamp': log['timestamp'],
                'confidence': Math.floor(log['dist'] * 100),
                'maxConfidence': maximumConfidence,
              },
            };
          } else {
            tempPersonByCamera[currentCameraID] = {
              ...prevRecords[currentCameraID], [currentEmployeeID]: {
                ...employee,
                'counter': 1,
                'timestamp': log['timestamp'],
                'confidence': Math.floor(log['dist'] * 100),
                'maxConfidence': Math.floor(log['dist'] * 100),
              },
            };
          }
        }
      }
      return { ...prevRecords, ...tempPersonByCamera };
    });
  };

  const filterEmployeeByLastName = (search: string) => {
    getEmployeeList(10, search);
  };

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h1">{t('personnel.personnelTitle')}</Typography>
        <div className={classes.headerActions}>
          <NavLink to={`/${locale}/entrance/history`}>
            <Tooltip title={t('general.historyMode')}>
              <IconButton>
                <History fontSize="default" color="primary" />
              </IconButton>
            </Tooltip>
          </NavLink>
          <IconButton onClick={() => setIsCardHorizontal((prevState) => !prevState)}>
            {isCardHorizontal && (<Tooltip title={t('general.changeView')}><ViewColumn fontSize="default" color="primary" /></Tooltip>)}
            {!isCardHorizontal && (<Tooltip title={t('general.changeView')}><ViewStream fontSize="default" color="primary" /></Tooltip>)}
          </IconButton>
        </div>
      </Box>
      <Box className={classes.container}>
        <Flipper className={classes.wrapper} flipKey={flipperData.join('')}>
          <Grid container spacing={2}>
            {Object.keys(personnelObject).length > 0 && flipperData.map((item: number, index: number) =>
              <Flipped key={index} flipId={item}>
                <Grid
                  item
                  xs={(isCardHorizontal) ? 12 : 12}
                  sm={(isCardHorizontal) ? 6 : 4}
                  md={(isCardHorizontal) ? 4 : 3}
                  lg={(isCardHorizontal) ? 4 : 2}
                  key={index}
                >
                  <EntranceCard
                    avatarURL={environment.apiAddress + personnelObject[item]['avatarURL']}
                    name={`${personnelObject[item]['firstName']} ${personnelObject[item]['lastName']}`}
                    position={`Cam: ${personnelObject[item]['streamNumber']}`}
                    organization={`Conf: ${(personnelObject[item]['maxConfidence']) ?? 0}`}
                    profileID={personnelObject[item]['profileID']}
                    isOnline={true}
                    isHorizontal={isCardHorizontal}
                    counter={personnelObject[item]['counter']}
                  />
                </Grid>
              </Flipped>
            )}
            {Object.keys(personnelObject).length === 0 &&
              <Grid item xs={12}>
                <IllustrationViewer illustration={'noLog.svg'} title={'general.noDataTitle'} content={'general.noDataContent'} />
              </Grid>
            }
          </Grid>
        </Flipper>
        <Sticky title={t('personnel.filterTitle')}>
          <Grid container spacing={3}>
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
                  onChange={(event: any, newValue) => setSelectedEmployee(newValue)}
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
                  onChange={(event: any) => setSelectedFaceCameras(event.target.value)}
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
          </Grid>
        </Sticky>
      </Box>
    </>
  );
};

export default Entrance;
