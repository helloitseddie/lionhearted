import React from 'react';

import { Grid, Paper, Box } from '@material-ui/core';

import aboutJson from './helpers/about.json';
import lionfish2000 from './helpers/lionfish2000.png';
import lionfish2020 from './helpers/lionfish2020.png';
import shellhacks from './helpers/shellhacks.png';

import useStyles from './style';

const AboutPage = () => {
  const classes  = useStyles();

  const RenderPhoto = (photo, source) => {
    return (
      <>
        <Box className={classes.headingBox}>
          <img alt="#" src={photo} width="50%"/>
        </Box>
        <Box className={classes.headingBox} pb={4}>
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
            <h3 className={classes.head}>About the Lionfish</h3>
          </Box>
          <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
          </Paper>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>Why lionfish are such an issue</h2>
          </Box>
          <p className={classes.body}><br />
            {aboutJson.about1}
          </p>
          {RenderPhoto(lionfish2000, "The spread of lionfish in 2000")}
          {RenderPhoto(lionfish2020, "The spread of lionfish in 2020, just 20 years later")}
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>What you can do to help</h2>
          </Box>
          <p className={classes.body}><br />
            {aboutJson.about2}
            <a href="https://myfwc.com/fishing/saltwater/recreational/lionfish/#:~:text=A%20permit%20is%20required%20to,Florida%20Keys%20National%20Marine%20Sanctuary.&text=The%20FWC%20only%20issues%20permits,where%20spearing%20is%20not%20allowed.">Here</a>
          </p>
          <Box pb={5}/>
        </Paper>
        <Paper variant="outlined" className={classes.articleContainer}>
          <Box className={classes.headingBox}>
            <h3 className={classes.head}>About the Project</h3>
          </Box>
          <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
          </Paper>
          <Box pb={4}/>
          {RenderPhoto(shellhacks)}
          <p className={classes.body}><br />
            {aboutJson.about3}
          </p>
          <Box pb={5}/>
        </Paper>
      </Grid>
    </>
  );
}

export default AboutPage;
