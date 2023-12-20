import React from "react";
import { useStyle } from "./alert.style";
import { Alert } from "@material-ui/lab";

const AlertComponent = (AlertMessage: string, AlertColor: any) => {
  const classes = useStyle();
  return (
    <Alert
      icon={false}
      variant="filled"
      severity={AlertColor}
      className={classes.csvAlert}
    >
      {AlertMessage}
    </Alert>
  );
};

export default AlertComponent;
