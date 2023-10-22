import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';

import actions from 'src/redux/appSetting/actions';
import { IAppSettingState } from 'src/redux/appSetting/types';

interface ToastProps {
  data: IAppSettingState['toast'];
}

const Toast: React.FC<ToastProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [ open, setOpen ] = useState(false);

  const {
    message,
    severity,
    horizontal,
    vertical,
    autoHideDuration,
    action,
  } = data;

  useEffect(() => {
    if (message) {
      setOpen(true);
    } else {
      dispatch(
          actions.setToast({
            message: '',
            severity: 'info',
            horizontal: 'center',
            vertical: 'top',
            autoHideDuration: 0,
            action: undefined,
          })
      );
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={() => setOpen(false)}
      anchorOrigin={{
        horizontal: horizontal,
        vertical: vertical,
      }}
    >
      <MuiAlert
        severity={severity}
        variant="filled"
        elevation={1}
        action={
          <>
            {action && (
              <Button color="default" size="small" onClick={action.fn}>
                {action.label}
              </Button>
            )}
            <IconButton
              size="small"
              aria-label="close"
              color="primary"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          {message}
        </Box>
      </MuiAlert>
    </Snackbar>
  );
};

export { Toast };
