import {
  Avatar, Box, Button, Grid, IconButton, Paper,
} from '@material-ui/core';
import { Delete, Edit, PersonAdd } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { IColumnsProp, Table } from 'src/components/share/table';
import { Sticky } from 'src/components/static/sticky-wrapper';
import { BoardDataInterface } from 'src/entities/board-data.interface';
import { JSONToCSVConvertor } from 'src/helpers/json/json-to-csv';
import { PersonnelDataInterface } from 'src/interfaces/personnel-data.interface';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { PhoneNumberPipe } from 'src/pipes/phone-number/phone-number.pipe';
import { AppState } from 'src/redux/store';
import { getEmployees } from 'src/services/api/personnel.api';
import { useStyle } from './users.style';

const Users = () => {
  const datePipe = new DatePipe();
  const { t } = useTranslation();
  const classes = useStyle();
  const history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [ loading, setLoading ] = useState(false);
  const [ personnel, setPersonnel ] = useState<PersonnelDataInterface[]>([]);
  const [ count, setCount ] = useState<number>(100);
  const [ page, setPage ] = useState<number>(parseInt('' + params.get('page')) || 1);
  const [ perPage, setPerPage ] = useState<number>(10);
  const { phoneNumberParser } = new PhoneNumberPipe();
  const { locale } = useSelector((state: AppState) => state.AppSetting);

  useEffect(() => {
    setLoading(true);
    const queryParams: any = {
      size: perPage,
      page: page,
    };
    getEmployees(queryParams).subscribe({
      next: (res: any) => {
        setLoading(false);
        setCount((prevState: number) => {
          const recordsLength: number = (res.count !== undefined) ? Math.ceil(res.count / 10) : 100;
          return recordsLength;
        });
        setPersonnel(res['results']);
      },
      error: (err: Error) => setLoading(false),
      complete: () => setLoading(false),
    });
  }, [page]);

  const handleChange = (e: any, pageNumber: number) => {
    paginate(pageNumber);
  };

  const paginate = (n: number) => {
    setPage(n);
    history.push({
      pathname: `/${locale}/users`,
      search: '?page=' + n,
    });
  };

  const tableColumns: IColumnsProp<any>[] = [
    {
      key: 'id',
      title: '#',
      width: '20',
      render: (record: any) => {
        const ItemIndex = personnel.indexOf(record) + 1;
        return ((perPage * (page - 1)) + ItemIndex);
      },
    },
    {
      key: 'avatar',
      title: 'users.avatar',
      width: '45',
      render: (record: any) => (
        <Avatar alt={record.name} src={`${record.avatar}`} />
      ),
    },
    { key: 'first_name', title: 'users.firstName' },
    { key: 'last_name', title: 'users.lastName' },
    {
      key: 'birthdate',
      title: 'users.birthdate',
      width: '250',
      render: (record: any) => (record.birthdate) ? datePipe.dateConvertor(record.birthdate, 'DD MMM YYYY', locale) : '',
    },
    {
      key: 'phone_number',
      title: 'users.phoneNumber',
      width: '150',
      render: (record: any) => {
        // ToDo: Show PhoneNumber With Using phoneNumberParser
        // const parsedTel = phoneNumberParser( record.phoneNumber );
        // return (parsedTel.international) ? parsedTel.international : '';
        return record.phone_number;
      },
    },
    { key: 'position', title: 'users.position', width: '75' },
    {
      key: 'Actions',
      title: 'users.actions',
      width: '75',
      render: (record) => tableActs(record, 'center'),
    },
  ];

  const tableActs = (record: BoardDataInterface, justify: 'center' | 'flex-start') => {
    return (
      <Grid container justify={justify} wrap="nowrap">
        {/* <Grid item>
          <IconButton className={classes.iconButton} size="small">
            <Delete />
          </IconButton>
        </Grid> */}
        <Grid item>
          <NavLink to={`/${locale}/user/${record.id}`}>
            <IconButton className={classes.iconButton} size="small">
              <Edit />
            </IconButton>
          </NavLink>
        </Grid>
      </Grid>
    );
  };

  const DownloadCSV = () => {
    const { csvUrl, filename } = JSONToCSVConvertor(personnel, 'Sample', true);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
      <div className={classes.wrapper}>
        <Box className={classes.contentWrapper}>
          <Paper>
            <Table
              columns={tableColumns}
              data={personnel}
              loading={loading}
              collapsableSize="xs"
            />
          </Paper>
          {!!personnel.length && (
            <div className={classes.footer}>
              <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </Box>
        <Sticky title={t('users.filterTitle')}>
          <Box className={classes.sideBarItem}>Filter Will Be Added Here</Box>
          <NavLink to={`/${locale}/users/add`}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAdd />}
              disableElevation
              fullWidth
            >
              {t('users.createUserBtn')}
            </Button>
          </NavLink>
        </Sticky>
      </div>
    </>
  );
};

export default Users;
