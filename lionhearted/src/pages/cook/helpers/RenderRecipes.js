import React, { useEffect, useState, useRef } from "react";

import useStyles from '../style';

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Button from "@material-ui/core/Button";

import { getRecipes, searchRecipes } from "../../../actions/cook/CookActions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const IndividualRecipe = (recipe) => {
  const classes  = useStyles();
  const gridRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    setWidth(gridRef.current.offsetWidth);
    setHeight(recipe.recipe.picture.height * (gridRef.current.offsetWidth / recipe.recipe.picture.width))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return (
    <Box pb={3}>
      <Paper variant="outlined">
        <Box p={3}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item ref={gridRef} xs={12}>
              <Box display="flex" flexDirection="column" pb={2}>
                <img alt="" src={recipe.recipe.picture.url} height={height} width={width}/>
                  <a href={recipe.recipe.link} target="_blank" rel="noreferrer" className={classes.link}>
                      <b>{recipe.recipe.title}</b>
                  </a>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

const Recipes = () => {
    const classes  = useStyles();
    const [showSpinner, setShowSpinner] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [searchInput, setSearch] = useState(" ");
    const [isSearching, setIsSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const errorMessage = "Unfortunately that result didn't return any recipes. Please try again with a broader search. Click this message to dismiss."

    useEffect(() => {
        const refreshRecipes = async () => {
            try {
                setShowSpinner(true);
                let response;
                if (!isSearching) {
                  response = await getRecipes();
                } else {
                  response = await searchRecipes(searchInput)
                  if (response.length === 0) {
                    setIsSearching(false);
                    setNoResults(true);
                  }
                }
                setRecipes(response);
                setShowSpinner(false);
            } catch (error) {
                console.error(error);
                setShowSpinner(false);
            }
        };
        if (recipes === undefined || recipes.length === 0) refreshRecipes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipes, isSearching]);

    const handleSearch = () => {
      setIsSearching(true);
      setRecipes([]);
    }

    const resetSearch = () => {
      setIsSearching(false);
      setRecipes([]);
    }

    return (
        <Container maxWidth="lg">
            {showSpinner && <LinearProgress />}
            {noResults && <Button className={classes.errorMessage} onClick={() => setNoResults(false)}>{errorMessage}</Button>}
            <Box pt={5} >
              <h3 className={classes.subHead}>Recipes:</h3>
            </Box>
            <Grid item container spacing={2} xs={12} sm={8}>
              <div style={{width: "100%", marginLeft: "0.25rem"}}>
                <TextField onKeyDown={e => e.key === 'Enter' ? handleSearch() : ""} label="Search" variant="outlined" className={classes.searchBar} fullWidth onChange={e => setSearch(e.target.value)}/>
                <Button onClick={handleSearch} color="primary" variant="contained" startIcon={<SearchOutlinedIcon />} className={classes.searchButton}></Button>
              </div>
            </Grid>
            {isSearching && <Box pt={2} height="100%">
              <Breadcrumbs>
                <Link to="#" onClick={resetSearch}>
                  Show all recipes
                </Link>
              </Breadcrumbs>
            </Box>}
            <Box pb={3}>
              <Box pb={2}>
              </Box>
            </Box>
            {recipes !== undefined &&
                recipes.length !== 0 &&
                recipes.map((recipe,index) => {
                    return <IndividualRecipe key={index} recipe={recipe} />;
                })}
        </Container>
    );
};

export default Recipes;
