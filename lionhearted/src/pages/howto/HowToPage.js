import React, { useState, useEffect, useRef } from 'react';

import { Grid, Paper, Box } from '@material-ui/core';

import infoD1 from './helpers/infoD1.png';
import infoD2 from './helpers/infoD2.png';

import useStyles from './style';

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

const HowToPage = () => {
  const classes  = useStyles();
  const paperRef = useRef(null);
  const [width, setWidth] = useState(null);
  let windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > 700) {
      setWidth((paperRef.current.offsetWidth) - 250);
    } else {
      setWidth((paperRef.current.offsetWidth) - 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return(
    <>
      <Grid container spacing={0} alignItems="stretch" justifyContent="center" className={classes.bg}>
        <Paper variant="outlined" className={classes.articleContainer} ref={paperRef}>
          <Box className={classes.headingBox}>
            <h3 className={classes.head}>How to Use The Coral Safari</h3>
          </Box>
          <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
          </Paper>
          <Box className={classes.headingBox}>
            <h2 className={classes.subHead}>Here's a couple screenshots that'll help you out</h2>
          </Box>
          <img src={infoD1} alt="" width={width} className={classes.helpPics}/>
          <img src={infoD2} alt="" width={width} className={classes.helpPics}/>
        </Paper>
      </Grid>
    </>
  );
}

export default HowToPage;
