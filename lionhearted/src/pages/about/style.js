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
    margin: '1rem',
    color: theme.palette.primary.light,
  },
  body: {
    margin: '1rem',
    marginLeft: '3rem',
    marginRight: '3rem',
    fontFamily: 'Lato',
    color: theme.palette.primary.main,
  }
}));

export default useStyles;
