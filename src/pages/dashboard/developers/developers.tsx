import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { useStyle } from 'src/pages/dashboard/developers/developers.style';
import clsx from 'clsx';
import { HotKeys } from 'react-hotkeys';

const Developers = () => {
  const classes = useStyle();
  const [ isDevModeActive, setIsDevModeActive ] = useState<boolean>(false);

  const activeDevMode = () => {
    setIsDevModeActive( ( prevState: boolean ) => !prevState );
  };

  const keyMap = {
    DEV_MODE: 'd e v',
  };

  const handlers = {
    DEV_MODE: activeDevMode,
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <Box className={classes.wrapper}>
        <div className={clsx(classes.lockBox, { [classes.isLocked]: isDevModeActive })} onClick={activeDevMode}>
          <svg className={classes.svg} width='36' height='40' viewBox='0 0 30 40'>
            <path className={classes.lockBody} d='M27 27C27 34.1797 21.1797 40 14 40C6.8203 40 1 34.1797 1 27C1 19.8203
            6.8203 14 14 14C21.1797 14 27 19.8203 27 27ZM15.6298 26.5191C16.4544 25.9845 17 25.056 17 24C17 22.3431 15.6569
            21 14 21C12.3431 21 11 22.3431 11 24C11 25.056 11.5456 25.9845 12.3702 26.5191L11 32H17L15.6298 26.5191Z'/>
            <path className={classes.lockHandel} d='M6 21V10C6 5.58172 9.58172 2 14 2V2C18.4183 2 22 5.58172 22 10V21'/>
            <path className={classes.lockBling} d='M29 20L31 22'/>
            <path className={classes.lockBling} d='M31.5 15H34.5'/>
            <path className={classes.lockBling} d='M29 10L31 8'/>
          </svg>
        </div>
      </Box>
    </HotKeys>
  );
};

export default Developers;
