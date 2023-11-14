import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    videoButtonsBox: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
  })
);

export { useStyle };
