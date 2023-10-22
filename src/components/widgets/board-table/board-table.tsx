import { Box, Chip, Grid, IconButton, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import VideocamIcon from '@material-ui/icons/Videocam';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CardWidget } from 'src/components/share/card-widget';
import { IColumnsProp, Table } from 'src/components/share/table';
import { BoardDataInterface } from 'src/entities/board-data.interface';
import actions from 'src/redux/actions';
import { getBoardDataApi, getCameraInfoApi } from 'src/services/branch-api/board-data-api';
import { BoardTableProps } from './board-table.props';
import { useStyle } from './board-table.style';

const BoardTable: React.FC<BoardTableProps> = ({
  title,
  setTitle,
  setMenuItems,
  setFullHeight,
}) => {
  const classes = useStyle();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const [ loading, setLoading ] = useState(false);
  const [ tableData, setTableData ] = useState<BoardDataInterface[]>([]);

  useEffect(() => {
    handleGetBoardData();
    setTitle(!title ? 'board-table.title' : title);
    setFullHeight(true);
    setMenuItems([
      {
        clickHandler: handleGetBoardData,
        icon: RefreshIcon,
        label: 'widget.refresh',
      },
    ]);

    return () => {
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (!tableData.length) return;
    getCameraData();
  }, [tableData]);

  const handleGetBoardData = () => {
    getBoardsData();
  };

  const getBoardsData = () => {
    setLoading(true);

    getBoardDataApi().subscribe({
      next: (boardData) => {
        setTableData(boardData);
      },
      error: (error) => console.error(error),
      complete: () =>
        setTimeout(() => {
          setLoading(false);
        }, 1000),
    });
  };

  const getCameraData = async () => {
    getCameraInfoApi(tableData[0].boardId).subscribe({
      next: (cameraInfo) =>
        dispatch(actions.AppSetting.setActiveCameraInfo(cameraInfo)),
      error: (error) => console.error(error),
    });
  };

  const tableColumns: IColumnsProp<BoardDataInterface>[] = [
    { key: 'id', title: '#' },
    { key: 'boardId', title: 'board-table.boardId' },
    { key: 'count', title: 'board-table.count', hidden: { xsDown: true }},
    {
      key: 'network',
      title: 'board-table.network',
      hidden: { xsDown: true },
      render: (record) => (
        <Chip
          variant="outlined"
          label={record.network}
          className={clsx([
            classes.networkChip,
            {
              online: record.network.toLowerCase() === 'online',
              offline: record.network.toLowerCase() === 'offline',
            },
          ])}
        />
      ),
    },
    {
      key: 'lastActivity',
      title: 'board-table.lastActivity',
      hidden: { xsDown: true },
    },
    {
      key: 'boardService',
      title: 'board-table.boardService',
      hidden: { xsDown: true },
      render: (record) => <strong>{record.boardService}</strong>,
    },
    {
      title: 'board-table.act',
      render: (record) => tableActs(record, 'center'),
      hidden: { xsDown: true },
    },
  ];

  const tableActs = (record: BoardDataInterface, justify: 'center' | 'flex-start') => {
    return (
      <Grid container justify={justify} wrap="nowrap">
        <Grid item>
          <IconButton
            className={classes.iconButton}
            size="small"
            onClick={() => getCameraData()}
          >
            <VideocamIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  };

  const responsiveCollapse = (record: BoardDataInterface) => {
    return (
      <Box className={classes.collapseData}>
        <Typography>
          {t('board-table.count')} : {record.count}
        </Typography>
        <Typography>
          {t('board-table.network')} :{' '}
          <span
            className={clsx([
              classes.networkChip,
              {
                online: record.network.toLowerCase() === 'online',
                offline: record.network.toLowerCase() === 'offline',
              },
            ])}
          >
            {record.network}
          </span>
        </Typography>
        <Typography>
          {t('board-table.lastActivity')} : {record.lastActivity}
        </Typography>
        <Typography>
          {t('board-table.boardService')} :{' '}
          <strong>{record.boardService}</strong>
        </Typography>
        {tableActs(record, 'flex-start')}
      </Box>
    );
  };

  return (
    <Table
      columns={tableColumns}
      data={tableData}
      loading={loading}
      collapsableSize="xs"
      renderCollapseRow={responsiveCollapse}
    />
  );
};

const Wrapper = CardWidget<BoardTableProps>(BoardTable, {
  centerContent: true,
  breakPoints: {
    lg: {
      x: 6,
      y: 32,
      w: 18,
      h: 13,
      minW: 18,
      minH: 12,
    },
    md: {
      x: 0,
      y: 0,
      w: 16,
      h: 11,
      minW: 16,
      minH: 11,
    },
    sm: {
      x: 0,
      y: 0,
      w: 16,
      h: 11,
      minW: 16,
      minH: 11,
    },
    xs: {
      x: 0,
      y: 0,
      w: 12,
      h: 11,
      minW: 12,
      minH: 11,
    },
    xxs: {
      x: 0,
      y: 0,
      w: 12,
      h: 11,
      minW: 12,
      minH: 11,
    },
  },
});

export { Wrapper as BoardTable };
