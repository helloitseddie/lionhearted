import React from 'react';

import { Grid, Paper, Box } from '@material-ui/core';

import faqJson from './helpers/faq.json';

import useStyles from './style';

const FAQPage = () => {
  const classes  = useStyles();

  return(
    <>
      <Grid container spacing={0} alignItems="stretch" justifyContent="center" className={classes.bg}>
        <Paper variant="outlined" className={classes.articleContainer}>
          <Box className={classes.headingBox}>
            <h3 className={classes.head}>Frequently Asked Questions</h3>
          </Box>
          <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
          </Paper>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>How do I get information about a tag in my area?</h2>
          </Box>
          <p className={classes.body}><br />
            {faqJson.q1}
          </p>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>How do I place a tag?</h2>
          </Box>
          <p className={classes.body}><br />
            {faqJson.q2}
          </p>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>I placed a tag by accident. What now?</h2>
          </Box>
          <p className={classes.body}><br />
            {faqJson.q6}
          </p>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>Why do I need to fill out so much information to place a tag?</h2>
          </Box>
          <p className={classes.body}><br />
            {faqJson.q3}
          </p>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>Why won't the search bar do anything?</h2>
          </Box>
          <p className={classes.body}><br />
            {faqJson.q7}
          </p>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>What are the thumb up and down buttons for?</h2>
          </Box>
          <p className={classes.body}><br />
            {faqJson.q4}
          </p>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>Are you affiliated with the FWC or any other Anti-Lionfish organizations?</h2>
          </Box>
          <p className={classes.body}><br />
            {faqJson.q5}
          </p>
        </Paper>
      </Grid>
    </>
  );
}

export default FAQPage;
