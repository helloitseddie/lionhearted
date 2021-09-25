import React from 'react';

import { Grid, Paper, Box } from '@material-ui/core';

import cleanJson from './helpers/clean.json';

import useStyles from './style';

const CleanPage = () => {
  const classes  = useStyles();

  return(
    <>
      <Grid container spacing={0} alignItems="stretch" justifyContent="center" className={classes.bg}>
        <Paper variant="outlined" className={classes.articleContainer}>
          <Box className={classes.headingBox}>
            <h3 className={classes.head}>To Clean a Lionfish</h3>
          </Box>
          <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
          </Paper>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>Never forget you're dealing with a venomous animal!</h2>
          </Box>
          <p className={classes.body}><br />
            {cleanJson.clean1}
          </p>
          <p className={classes.body}><br />
            {cleanJson.clean2}
          </p>
          <Box pb={5} className={classes.headingBox}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/QDPDLyge98k" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </Box>
          <Box className={classes.headingBox}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ZC9r9sddnl0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </Box>
          <Box pb={5}/>
        </Paper>
      </Grid>
    </>
  );
}

export default CleanPage;
