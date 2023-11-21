import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Button } from '@material-ui/core';
import { useStyle } from 'src/pages/dashboard/add-user/add-user.style';
import momentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import PersonalInformationForm from './add-user-personal-information';
import FaceAuthorizationForm from './add-user-face-authorization';
import EntranceHistoryProfile from './add-user-entrance-history';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { ArrowBackIos, Face, Person, TransferWithinAStation } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'src/redux/store';
import moment from 'moment';
import { default as jMoment } from 'jalali-moment';
import 'moment/locale/fa.js';

const AddUser = () => {
  const classes = useStyle();
  const history = useHistory();
  const { t } = useTranslation();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { direction, locale } = useSelector((state: AppState) => state.AppSetting );
  const [ value, setValue ] = useState(parseInt(params.get('tab')) || 0);
  const [ employeeID, setEmployeeID ] = useState<string>(id);

  useEffect( () => {
    moment().locale( locale );
    history.push({ search: `tab=${value.toString()}` });
  }, []);

  useEffect( () => {
    moment().locale( locale );
  }, [locale]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    history.push({ search: `tab=${newValue.toString()}` });
  };

  const handlePersonalFormSubmit = (response: any) => {
    setTimeout(() => {
      history.push({
        pathname: `/${locale}/user/${response['id']}`,
        search: '?tab=1',
      });
    }, 2000);
  };

  return (
    <MuiPickersUtilsProvider libInstance={jMoment} utils={momentUtils} locale={locale}>
      <Box className={classes.TabsWrapper}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          color="default"
          value={value}
          onChange={handleChange}
          className={classes.tabsBar}
          aria-label="Vertical tabs example"
        >
          <Tab label={ t('addUsers.firstTab') } icon={<Person />} />
          {(employeeID !== undefined) && <Tab label={ t('addUsers.secondTab') } icon={<Face />} /> }
          {(employeeID !== undefined) && <Tab label={ t('addUsers.userHistory') } icon={<TransferWithinAStation />} /> }
        </Tabs>
        <Box className={classes.TabsItemWrapper} hidden={value !== 0} role="tabpanel">
          <PersonalInformationForm employeeID={employeeID} onFormSubmitted={handlePersonalFormSubmit}/>
        </Box>
        {(employeeID !== undefined && value === 1 ) &&
          <Box className={classes.TabsItemWrapper} hidden={value !== 1} role="tabpanel">
            <FaceAuthorizationForm employeeID={employeeID}/>
          </Box>
        }
        {(employeeID !== undefined && value === 2 ) &&
          <Box className={classes.TabsItemWrapper} hidden={value !== 2} role="tabpanel">
            <EntranceHistoryProfile employeeID={employeeID}/>
          </Box>
        }
      </Box>
      <div className={classes.footer}>
        <NavLink to={`/${locale}/users`} >
          <Button size="large" startIcon={<ArrowBackIos />} >{ t('addUsers.backBtn') }</Button>
        </NavLink>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default AddUser;
