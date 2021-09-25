import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  topBar: {
    width: "100%",
    height: "3rem",
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    paddingRight: "6rem",
    height: "3.5rem",
    width: "3.5rem",
  },
  menuLogo: {
    height: "10rem",
    width: "10rem",
  },
  icons: {
    height: "2rem",
    width: "2rem",
    color: "white",
  },
  exit: {
    justifyContent: "right",
    alignItems: "right",
    height: "2rem",
    width: "2rem",
    color: "white",
  },
  menuPopout: {
    backgroundColor: theme.palette.primary.main,
    height: "200%",
  },
  menuText: {
    color: "white",
  },
  menuOptions: {
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      textDecoration: "none",
    }
  }
}));

export default useStyles;
