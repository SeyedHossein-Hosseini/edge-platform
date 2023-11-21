import {
  Box,
  Checkbox,
  Dialog, DialogContent, DialogTitle, FormControl, Grid,
  IconButton, InputLabel, ListItemText, MenuItem, Select, TextField, Tooltip, Typography,
} from '@material-ui/core';
import { History } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IllustrationViewer } from 'src/components/static/illustration-viewer';
import { LicensePlateCard } from 'src/components/static/license-plate-card';
import { Sticky } from 'src/components/static/sticky-wrapper';
import licensePlateCategories from 'src/dump/plate-categories.dump';
import licensePlateCityCategories from 'src/dump/plate-city-categories.dump';
import { useStyle } from 'src/pages/dashboard/license-plate/license-plate.style';
import { AppState } from 'src/redux/store';
import { getLicensePlateCamerasList } from 'src/services/api/service-config.api';
import { WebSocketConnection } from 'src/services/web-socket/web-socket';
import { environment } from '../../../../environments/environment';

const LicensePlate = () => {
  const classes = useStyle();
  const { t } = useTranslation();
  const [ isSocketConnected, setIsSocketConnected ] = useState(false);
  const [ socketInstance, setSocketInstance ] = useState(null);
  const { locale } = useSelector((state: AppState) => state.AppSetting);
  const [ flipperData, setFlipperData ] = useState([]);
  const [ licenses, setLicenses ] = useState<any[]>([]);
  const [ shownLicenses, setShownLicenses ] = useState<any[]>([]);
  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false);
  const [ currentDialogInfo, setCurrentDialogInfo ] = useState<string>();

  // Filters
  const [ cameraList, setCameraList ] = useState([]);
  const [ categoryList, setCategoryList ] = useState([]);
  const [ cityList, setCityList ] = useState([]);
  const [ selectedCategoryChar, setSelectedCategoryChar ] = useState([]);
  const [ selectedCityChar, setSelectedCityChar ] = useState([]);
  const [ selectedCamera, setSelectedCamera ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState([]);
  const [ selectedCity, setSelectedCity ] = useState([]);
  const [ maxCount, setMaxCount ] = useState(10);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const handleSocketMessage = (log: any) => {
    setLicenses((prevLicense) => [ log, ...prevLicense ]);
  };

  const licensePlatePreviewHandler = (image: string) => {
    setCurrentDialogInfo((prevImage) => image);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setCurrentDialogInfo('');
    setIsDialogOpen(false);
  };

  const maxCountHandler = (e: any) => {
    const count = Math.min(Math.max(e.target.value, 5), 15);
    setMaxCount(count);
  };

  useEffect(() => {
    const categoryTemp: any[] = [];
    const cityTemp: any[] = [];
    getLicensePlateCamerasList().subscribe({
      next: (cameras: any) => {
        setCameraList(cameras);
      },
      error: (err: Error) => setCameraList([]),
    });
    Object.keys(licensePlateCategories).map((item: keyof typeof licensePlateCategories, index: number) => {
      categoryTemp.push({ key: item, value: licensePlateCategories[item] });
    });
    setCategoryList(categoryTemp);

    Object.keys(licensePlateCityCategories).map((item: keyof typeof licensePlateCityCategories, index: number) => {
      cityTemp.push({ key: item, value: licensePlateCityCategories[item] });
    });
    setCityList(cityTemp);

    if (isSocketConnected) return;
    setSocketInstance(
        new WebSocketConnection<any>({ baseURL: environment.socketAddress + 'license/' })
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
        handleSocketMessage(log);
      });

      // Set Socket Instance as null
      socketInstance.onSocketClosed(() => setSocketInstance(null));
    } else {
      // ReConnect To Socket End Point
      setSocketInstance(
          new WebSocketConnection<any>({ baseURL: environment.socketAddress + 'license/' })
      );
    }
  }, [socketInstance]);

  useEffect(() => {
    let selectedCharTemp: Array<string> = [];
    selectedCategory.map((cat: keyof typeof licensePlateCategories) => {
      return selectedCharTemp = selectedCharTemp.concat(licensePlateCategories[cat]['letter']);
    });
    setSelectedCategoryChar(selectedCharTemp);
  }, [selectedCategory]);

  useEffect(() => {
    let selectedCharTemp: Array<string> = [];
    selectedCity.map((cat: keyof typeof licensePlateCityCategories) => {
      return selectedCharTemp = selectedCharTemp.concat(licensePlateCityCategories[cat]['letter']);
    });
    setSelectedCityChar(selectedCharTemp);
  }, [selectedCity]);

  useEffect(() => {
    const filtered = licenses.filter(function(lic) {
      if (this.count < this.maxCount &&
        (selectedCamera.length === 0 || selectedCamera.indexOf(lic['stream_id']) >= 0) &&
        (selectedCategoryChar.length === 0 || selectedCategoryChar.indexOf(lic['char']) >= 0) &&
        (selectedCityChar.length === 0 || selectedCityChar.indexOf(lic['number'].slice(-2)) >= 0)) {
        this.count++;
        return true;
      }
      return false;
    },
    { count: 0, maxCount: maxCount });
    setShownLicenses(filtered);
    setFlipperData([...new Array(filtered.length)].map((_, i) => i));
  }, [ licenses, selectedCamera, selectedCategoryChar, maxCount, selectedCityChar ]);

  return (
    <>
      <Box className={classes.header}>
        <Typography variant="h1">{t('licensePlate.licensePlateTitle')}</Typography>
        <div className={classes.headerActions}>
          <NavLink to={`/${locale}/license-plate/history`}>
            <Tooltip title={t('general.historyMode')}>
              <IconButton>
                <History fontSize="default" color="primary" />
              </IconButton>
            </Tooltip>
          </NavLink>
        </div>
      </Box>
      <Box className={classes.container}>
        <Flipper className={classes.wrapper} flipKey={flipperData.join('')}>
          <Grid container spacing={2}>
            {shownLicenses.length > 0 && flipperData.map((item: number, index: number) => <Flipped key={index} flipId={item}>
              <Grid item xs={12} key={index}>
                <LicensePlateCard
                  licenseID={shownLicenses[item]['number']}
                  flag={'IR'}
                  char={shownLicenses[item]['char']}
                  timestamp={shownLicenses[item]['timestamp']}
                  streamId={shownLicenses[item]['stream_id']}
                  image={shownLicenses[item]['image']}
                  imagePreviewHandler={licensePlatePreviewHandler}
                />
              </Grid>
            </Flipped>
            )}
            {flipperData.length === 0 &&
              <Grid item xs={12}>
                <IllustrationViewer illustration={'noLog.svg'} title={'general.noDataTitle'} content={'general.noDataContent'} />
              </Grid>
            }
          </Grid>
        </Flipper>
        <Sticky title={t('licensePlate.filterTitle')}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="selected_camera">{t('licensePlate.cameraFilter')}</InputLabel>
                <Select
                  fullWidth
                  labelId="selected_camera"
                  multiple={true}
                  value={selectedCamera}
                  MenuProps={MenuProps}
                  label={t('licensePlate.cameraFilter')}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                  onChange={(event: any) => setSelectedCamera(event.target.value)}
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
                  onChange={(event: any) => setSelectedCategory(event.target.value)}
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
                  onChange={(event: any) => setSelectedCity(event.target.value)}
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
                value={maxCount}
                onChange={maxCountHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Sticky>
      </Box>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle className={classes.dialogHeader}>
          <Typography variant='h3' component='p'><strong>{t('restricted.popupTitle')}</strong></Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <figure className={classes.dialogImageBox}>
            <img src={environment.UploadsBasePath + currentDialogInfo} className={classes.dialogImage} />
          </figure>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LicensePlate;
