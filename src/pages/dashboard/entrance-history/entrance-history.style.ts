import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
    },
    headerActions: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    wrapper: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    pagination: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      marginTop: theme.spacing(2),
    },
    csvAlert: {
      textAlign: 'center'
    },
    exportCsvRoot: {
      display: "flex",
      alignItems: "center",
    },
    exportCsvWrapper: {
      margin: theme.spacing(1),
      position: "relative",
      width: "100%"
    },
    exportCsvButtonSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
    exportCsvbuttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export { useStyle };
