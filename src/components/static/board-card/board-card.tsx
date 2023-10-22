import React from 'react';
import { Box, Divider, Paper, Typography, Chip } from '@material-ui/core';
import { Wifi, WifiOff } from '@material-ui/icons';
import { BoardCardProps } from './board-card.props';
import { useStyle } from './board-card.style';
import clsx from 'clsx';


const BoardCard: React.FC<BoardCardProps> = ({
  isOnline,
  serviceName,
  boardName,
}) => {
  const classes = useStyle();

  return (
    <Paper elevation={3} className={classes.BoardCardWrapper}>
      <Box className={classes.BoardCardHeader}>
        <Typography component='p' variant='h3'>{ boardName }</Typography>
        <Chip
          variant="outlined"
          color="primary"
          icon={ (isOnline) ? <Wifi /> : <WifiOff />}
          label={'Online'}
          className={clsx([
            classes.networkChip,
            {
              online: isOnline,
              offline: !isOnline,
            },
          ])}
        />
      </Box>
      <Divider />
      <ul className={classes.BoardCardInfo}>
        <li className={classes.BoardCardInfoItem}>
          <Typography component='span' variant='body1'>Active Service</Typography>
          <Typography component='p' variant='body1'><strong>{ serviceName }</strong></Typography>
        </li>
      </ul>
    </Paper>
  );
};

export { BoardCard };
