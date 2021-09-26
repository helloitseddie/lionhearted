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
    marginTop: "10vh",
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
  },
  pageContainer: {
    display: 'flex',
    width: '75%'
  },
  title: {
    fontSize: '9vh',
    fontFamily: 'Lato',
    color: theme.palette.primary.main,
  },
  articleContainer: {
    marginTop: "4vh",
    marginBottom: "4vh",
    width: '75%',
  },
  headingBox: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: "2rem",
  },
  head: {
    fontSize: '3rem',
    fontFamily: 'Lato',
    margin: '1rem',
    color: theme.palette.secondary.main,
  },
  subHead: {
    fontSize: '2rem',
    fontFamily: 'Lato',
    margin: '1rem',
    color: theme.palette.primary.light,
  },
  body: {
    margin: '1rem',
    marginBottom: "2rem",
    marginLeft: '3rem',
    marginRight: '3rem',
    fontFamily: 'Lato',
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
