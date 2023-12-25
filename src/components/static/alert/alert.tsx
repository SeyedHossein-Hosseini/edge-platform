import { Typography, IconButton, Collapse } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useStyle } from "./alert.style";

const MuiAlert = (props: any) => {
  return <Alert variant="filled" {...props} />;
};

const AlertComponent = (props: any) => {
  const [open, setOpen] = useState(true);

  const classes = useStyle();

  return (
    <Collapse in={open}>
      <MuiAlert
        severity={props.isSuccess ? "success" : "error"}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon
              fontSize="inherit"
              className={classes.exportCsvAlertCloseIcon}
            />
          </IconButton>
        }
      >
        <Typography variant="body1">{props.exportCsvMessage}</Typography>
      </MuiAlert>
    </Collapse>
  );
};

export default AlertComponent;
