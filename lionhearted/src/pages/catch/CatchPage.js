import React from 'react';

import { Grid, Paper, Box } from '@material-ui/core';

import freediveGear from './helpers/freediveGear.jpg';
import lionfish from './helpers/lionfish.png';

import catchJson from './helpers/catch.json';

import useStyles from './style';

const CatchPage = () => {
  const classes  = useStyles();

  const RenderPhoto = (photo, source) => {
    return (
      <>
        <Box className={classes.headingBox}>
          <img alt="#" src={photo} width="50%"/>
        </Box>
        <Box className={classes.headingBox}>
          <p style={{color: "#05A0D1"}}>{source}</p>
        </Box>
      </>
    );
  }

  return(
    <>
      <Grid container spacing={0} alignItems="stretch" justifyContent="center" className={classes.bg}>
        <Paper variant="outlined" className={classes.articleContainer}>
          <Box className={classes.headingBox}>
            <h3 className={classes.head}>To Catch a Lionfish</h3>
          </Box>
          <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
          </Paper>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>The first thing you need is equipment</h2>
          </Box>
          <p className={classes.body}><br />
            {catchJson.equipment}
          </p>
          {RenderPhoto(freediveGear)}
          <p className={classes.body}><br />
            {catchJson.equipment2}
          </p>
          <p className={classes.body}><br />
            {catchJson.equipment3}
          </p>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>Always follow state and local laws!</h2>
          </Box>
          <p className={classes.body}><br />
            {catchJson.rules1}
            <a href="https://myfwc.com/fishing/saltwater/recreational/lionfish/#:~:text=A%20permit%20is%20required%20to,Florida%20Keys%20National%20Marine%20Sanctuary.&text=The%20FWC%20only%20issues%20permits,where%20spearing%20is%20not%20allowed.">The FWC Website.</a>
          </p>
          {RenderPhoto(lionfish, "This is your target")}
          <p className={classes.body}><br />
            {catchJson.rules2}
          </p>
          <p className={classes.body}><br />
            {catchJson.rules3}
            <a href="https://www.reef.org/">REEF.org</a>
          </p>
          <p className={classes.body}><br />
            {catchJson.rules4}
            <a href="https://myfwc.com/fishing/saltwater/recreational/lionfish/#:~:text=A%20permit%20is%20required%20to,Florida%20Keys%20National%20Marine%20Sanctuary.&text=The%20FWC%20only%20issues%20permits,where%20spearing%20is%20not%20allowed.">Here</a>
          </p>
          <Box pb={5}/>
        </Paper>
      </Grid>
    </>
  );
}

export default CatchPage;
