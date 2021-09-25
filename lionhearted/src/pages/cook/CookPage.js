import React from 'react';

import { Grid, Paper, Box } from '@material-ui/core';

import cookJson from './helpers/cook.json';
import Recipes from './helpers/RenderRecipes';

import useStyles from './style';

const AboutPage = () => {
  const classes  = useStyles();
  
  return(
    <>
      <Grid container spacing={0} alignItems="stretch" justifyContent="center" className={classes.bg}>
        <Paper variant="outlined" className={classes.articleContainer}>
          <Box className={classes.headingBox}>
            <h3 className={classes.head}>To Cook a Lionfish</h3>
          </Box>
          <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
          </Paper>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>You're in for a treat</h2>
          </Box>
          <p className={classes.body}><br />
            {cookJson.intro}
          </p>
          <Recipes />
        </Paper>
      </Grid>
    </>
  );
}

export default AboutPage;
