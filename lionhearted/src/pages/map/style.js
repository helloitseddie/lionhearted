import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  test: {
    margin: 'auto',
  },
  mapContainer: {
    padding: 0,
    marginTop: 0,
    zIndex: 1000,
    position: "fixed"
  },
  searchBar: {
    marginTop: '2rem',
    marginLeft: '35%',
    width: '25rem',
    height: '3.5rem',
    zIndex: 1050,
    position: 'fixed',
  },
  searchBarMobile: {
    marginTop: '5rem',
    marginLeft: '0.25rem',
    width: '20rem',
    height: '3.5rem',
    zIndex: 1050,
    position: 'fixed',
  },
  searchBarBackground: {
    backgroundColor: 'white',
    borderRadius: '5%',
    width: '70%',
    height: '100%',
    zIndex: 1050,
  },
  searchButton: {
    backgroundColor: 'white',
    height: '100%',
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  searchIcon: {
    color: theme.palette.primary.light,
  },
  infoWindow: {
    fontSize: '15rem !important',
    fontFamily: 'Lato',
  },
  tagSubmitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
  },
  tagInput: {
    marginTop: '0.5rem',
  },
  errorMessage: {
    color: 'red',
    marginLeft: '1rem',
  },
  searchMarker: {
    zIndex: 1500,
  },
  marker: {
    zIndex: 1050,
  }
}));

export default useStyles;
