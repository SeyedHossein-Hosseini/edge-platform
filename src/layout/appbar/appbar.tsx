import {
  AppBar, Avatar, Box, Button, Dialog, DialogActions, DialogContent, Divider, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem,
  MenuProps, Select, TextField, Toolbar, Typography, withStyles,
} from '@material-ui/core';
import { Close, Language, Notifications, Widgets } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { DotBadge } from 'src/components/static/dot-badge';
import { GrayIconButton } from 'src/components/static/gray-icon-button';
import actions from 'src/redux/actions';
import { AppState } from 'src/redux/store';
import { WidgetLists } from 'src/services/widget-loader';
import { CustomAppbarProps } from './appbar.interface';
import { useStyle } from './appbar.style';

const CustomAppbar: React.FC<CustomAppbarProps> = ({ drawerWidth }) => {
  const classes = useStyle({ drawerWidth });
  const history = useHistory();
  const { pathname } = useLocation();
  const { url } = useRouteMatch();
  const { search } = useLocation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(search);
  const dashboardId = query.get('dashboardId');

  const [ langAnchorEl, setLangAnchorEl ] = React.useState<null | HTMLElement>(null);
  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
  const [ selectedRoute, setSelectedRoute ] = useState<keyof typeof WidgetLists>();
  const [ selectedTitle, setSelectedTitle ] = useState<string>();
  const [ dashboardName, setDashboardName ] = useState('');
  const [ dashboardType, setDashboardType ] = useState('');
  const [ createDialog, setCreateDialog ] = useState(false);
  const [ widgetDialog, setWidgetDialog ] = useState(false);
  const [ dashboardList, setDashboardList ] = useState([
    { title: 'Dashboard 1', id: '1' },
    { title: 'Dashboard 2', id: '2' },
    { title: 'Dashboard 3', id: '3' },
    { title: 'Dashboard 4', id: '4' },
  ]);
  const [ languageList, setLanguageList ] = useState([
    { title: 'Persian', slug: 'fa', direction: 'rtl', flag: 'IR' },
    { title: 'English', slug: 'en', direction: 'ltr', flag: 'US' },
  ]);

  const { drawer } = useSelector((state: AppState) => {
    return {
      drawer: state.AppSetting.drawer,
      direction: state.AppSetting.direction,
    };
  });
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting);
  const { avatar, firstName } = useSelector((state: AppState) => state.User);

  const handleDashboardSelect = (id: string) => {
    const dashboardUrl = url + `?dashboardId=${id}`;
    history.push(dashboardUrl);
  };

  const addNewWidget = () => {
    dispatch(
        actions.AppSetting.addWidgetToDashboard({
          widget: selectedRoute,
          props: {
            title: selectedTitle,
          },
        })
    );
    setWidgetDialog(false);
  };

  const changeLanguage = (language: any) => {
    // TODO: testing direction
    setLangAnchorEl(null);
    i18n.changeLanguage(language.slug);
    dispatch(actions.AppSetting.setDirection(language.direction));
    dispatch(actions.AppSetting.setLocale(language.slug));
  };

  useEffect(() => {
    if (locale) {
      const lng = languageList.filter((lang) => lang.slug === locale)[0];
      changeLanguage(lng);
    }
  }, [locale]);

  return (
    <>
      <AppBar
        color="transparent"
        elevation={5}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawer,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <Box className={classes.appBarRight}>
            <Box className={classes.appBarInfo}>
              <Avatar src={avatar} />
              <Box className={classes.userName}>
                <Typography noWrap>
                  {t('general.hi')} ,{' '}
                  <strong>
                    <i>{(firstName) ? firstName : t('general.name')}</i>
                  </strong>
                </Typography>
                <Typography variant="caption">{t('role.admin')}</Typography>
              </Box>
            </Box>

            <Box className={classes.appBarIcons}>
              <GrayIconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  setLangAnchorEl(event.currentTarget)
                }
              >
                <Language />
              </GrayIconButton>
              <StyledMenu
                anchorEl={langAnchorEl}
                keepMounted
                open={Boolean(langAnchorEl)}
                onClose={() => setLangAnchorEl(null)}
                className={classes.localizationMenu}
              >
                {languageList.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      const pathList = pathname.split('/');
                      pathList.splice(1, 1);
                      changeLanguage(item);
                      history.push(`/${item.slug}${pathList.join('/')}`);
                    }}
                  >
                    <ReactCountryFlag
                      countryCode={item.flag}
                      style={{ fontSize: '1.5em' }}
                    />
                    <span className={classes.languageItem}>{item.title}</span>
                  </MenuItem>
                ))}
              </StyledMenu>
              <GrayIconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  setAnchorEl(event.currentTarget)
                }
              >
                <Widgets />
              </GrayIconButton>
              <StyledMenu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                className={classes.dashboardMenu}
              >
                {dashboardList.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleDashboardSelect(item.id)}
                    className={
                      dashboardId === item.id ? classes.selectedDashboard : ''
                    }
                  >
                    {item.title}
                  </MenuItem>
                ))}

                <Divider />

                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setCreateDialog(true);
                  }}
                >
                  {t('appbar.createDashboard')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    setWidgetDialog(true);
                  }}
                >
                  {t('appbar.addWidget')}
                </MenuItem>
              </StyledMenu>
              <DotBadge invisible={false}>
                <GrayIconButton>
                  <Notifications />
                </GrayIconButton>
              </DotBadge>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        classes={{ paper: classes.dialog }}
        open={widgetDialog}
        onClose={() => setWidgetDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent className="widget">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className={classes.cardHeader}>
                <Typography variant="h5">{t('appbar.addWidget')}</Typography>
                <IconButton onClick={() => setWidgetDialog(false)}>
                  <Close />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label={t('appbar.addWidgetTitle')}
                  variant="outlined"
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.currentTarget.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: '100%' }}>
                <InputLabel id="selecte_route">
                  {t('appbar.selectWidget')}
                </InputLabel>
                <Select
                  label={t('appbar.selectWidget')}
                  labelId="selecte_route"
                  value={selectedRoute}
                  onChange={(
                      event: React.ChangeEvent<{
                      name?: string;
                      value: keyof typeof WidgetLists;
                    }>
                  ) => setSelectedRoute(event.target.value)}
                >
                  {Object.keys(WidgetLists)
                      .filter((w) => w !== 'mapWidget')
                      .map((keyName, index: number) => (
                        <MenuItem value={keyName} key={index}>
                          {keyName.toLowerCase().replace('_', ' ')}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="actions">
          <Button variant="contained" color="primary" onClick={addNewWidget}>
            {t('appbar.addWidget')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{ paper: classes.dialog }}
        open={createDialog}
        onClose={() => setCreateDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent className="content">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className={classes.cardHeader}>
                <Typography variant="h5">
                  {t('appbar.createDashboard')}
                </Typography>
                <IconButton onClick={() => setCreateDialog(false)}>
                  <Close />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('appbar.dashboardName')}
                fullWidth
                variant="outlined"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                autoHighlight
                options={[ 'OverView', 'Statistics' ]}
                getOptionLabel={(option) => option}
                onChange={(e, value) => setDashboardType(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('appbar.dashboardType')}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="actions">
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.warn(dashboardName, dashboardType)}
          >
            {t('appbar.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const StyledMenu = withStyles((theme) => ({
  paper: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.14)',
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

export { CustomAppbar as Appbar };
