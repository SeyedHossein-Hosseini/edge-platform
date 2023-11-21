import {
  Box,
  Grid,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BoardCard } from 'src/components/static/board-card';
import { CameraDetailsInterface } from 'src/interfaces/camera-details.interface';
import { DatePipe } from 'src/pipes/date/date.pipe';
import { AppState } from 'src/redux/store';
import { useStyle } from './boards.style';

const Boards = () => {
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

  useEffect(() => { }, []);


  return (
    <>
      <div className={classes.wrapper}>
        <Box className={classes.contentWrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <BoardCard isOnline={true} serviceName={'License Plate'} boardName={'Boards #1'} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <BoardCard isOnline={false} serviceName={'Face recognition'} boardName={'Boards #2'} />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Boards;
