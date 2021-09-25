import { makeStyles } from "@material-ui/core/styles";
import background from '../../background.png';

const useStyles = makeStyles(theme => ({
  bg: {
    backgroundImage: `url(${background})`,
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
    color: theme.palette.primary.main,
  },
  subHead: {
    fontSize: '2rem',
    fontFamily: 'Lato',
    marginTop: '1rem',
    marginBottom: '1rem',
    color: theme.palette.primary.light,
  },
  body: {
    margin: '1rem',
    marginLeft: '3rem',
    marginRight: '3rem',
    fontFamily: 'Lato',
    color: theme.palette.primary.main,
  },
  link: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "2rem",
    textDecoration: 'none',
    color: theme.palette.primary.light,
    "&:hover": {
      color: theme.palette.secondary.main
    },
  },
  searchBar: {
    width: "80%",
  },
  searchButton: {
    marginLeft: "0.25rem",
    maxWidth: "10%",
    minWidth:"10%",
    color: "white",
    height: "3.5rem",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main
    },
  },
  errorMessage: {
    backgroundColor: "rgba(255,0,0,0.5)",
    color: theme.palette.primary.light
  }
}));

export default useStyles;
