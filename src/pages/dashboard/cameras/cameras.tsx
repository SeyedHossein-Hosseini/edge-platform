import {
  Box, Chip, Grid, IconButton, Paper,
} from '@material-ui/core';
import { Camera, Gesture, Settings, Videocam } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IColumnsProp, Table } from 'src/components/share/table';
import { Sticky } from 'src/components/static/sticky-wrapper';
import { BoardDataInterface } from 'src/entities/board-data.interface';
import { CameraDetailsInterface } from 'src/interfaces/camera-details.interface';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { AppState } from 'src/redux/store';
import { useStyle } from './cameras.style';

const Cameras = () => {
  const datePipe = new DatePipe();
  const { t } = useTranslation();
  const classes = useStyle();
  const history = useHistory();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const [ loading, setLoading ] = useState(false);
  const [ records, setRecords ] = useState<CameraDetailsInterface[]>([]);
  const [ count, setCount ] = useState<number>(100);
  const [ page, setPage ] = useState<number>(parseInt('' + params.get('page')) || 1);
  const [ perPage, setPerPage ] = useState<number>(10);
  const { locale } = useSelector((state: AppState) => state.AppSetting);

  useEffect(() => {
    setRecords([
      {
        id: '1',
        ipAddress: '192.168.2.200',
        name: 'Front Desk',
        isEnabled: true,
        place: 'Floor 1',
        services: [ 'license-plate', 'restricted' ],
        lastActivity: 'Mon, 04 Jan 2021 13:55:26 GMT',
      },
    ]);
  }, []);

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
      render: (record: any) => {
        const ItemIndex = records.indexOf(record) + 1;
        return ((perPage * (page - 1)) + ItemIndex);
      },
    },
    { key: 'name', title: 'infrastructure.cameraName' },
    { key: 'place', title: 'infrastructure.cameraPlace' },
    {
      key: 'lastActivity',
      title: 'infrastructure.cameraLastActivity',
      render: (record: any) => (record.lastActivity) ? datePipe.dateConvertor(record.lastActivity, 'DD MMM YYYY HH:mm', locale) : '',
    },
    { key: 'services', title: 'infrastructure.cameraServices' },
    {
      key: 'isEnabled',
      title: 'infrastructure.cameraStatus',
      render: (record) => (
        <Chip
          variant="outlined"
          label={(record.isEnabled) ? 'Online' : 'Offline'}
          className={clsx([
            classes.networkChip,
            {
              online: record.isEnabled,
              offline: !record.isEnabled,
            },
          ])}
        />
      ),
    },
    {
      key: 'Actions',
      title: 'infrastructure.cameraActions',
      render: (record) => tableActs(record, 'center'),
    },
  ];

  const tableActs = (record: BoardDataInterface, justify: 'center' | 'flex-start') => {
    return (
      <Grid container justify={justify} wrap="nowrap">
        <Grid item>
          <IconButton className={classes.iconButton} size="small">
            <Settings />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.iconButton} size="small">
            <Gesture />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.iconButton} size="small">
            <Videocam />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton className={classes.iconButton} size="small">
            <Camera />
          </IconButton>
        </Grid>
      </Grid>
    );
  };


  return (
    <>
      <div className={classes.wrapper}>
        <Box className={classes.contentWrapper}>
          <Paper>
            <Table
              columns={tableColumns}
              data={records}
              loading={loading}
              collapsableSize="xs"
            />
          </Paper>
          {!!records.length && (
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
        </Sticky>
      </div>
    </>
  );
};

export default Cameras;
