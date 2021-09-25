import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bg: {
    marginTop: "4rem",
    backgroundColor: theme.palette.primary.main,
    height: "70vh",
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  logo: {
    height: "15rem",
    marginLeft: "4.5rem",
    padding: 0,
  },
  coralWords: {
    width: "20rem",
    marginLeft: "2.75rem",
    padding: 0,
  },
  loginBox: {
    margin: 0
  },
  nameDiv: {
    width: "100%",
    backgroundColor: "white",
  },
  instructions: {
    width: "25rem",
    color: "white",
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "2rem",
  },
  submitButton: {
    marginTop: "2rem",
    backgroundColor: "white",
    color: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    }
  },
  info: {
    marginTop: "2rem",
    boxShadow: "0 0 0 4px #fff",
  },
  moveButt: {

    marginTop: "2rem",
    height: "4rem",
    width: "10rem",
    backgroundColor: "white",
    color: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    }
  }
}));

export default useStyles;
