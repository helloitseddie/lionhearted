import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../actions/user/UserActions';

import { Grid, TextField, Button, Paper, Box } from '@material-ui/core';

import useStyles from './style';
import lionlogo from './helpers/lionlogo.png';
import coralSafari from './helpers/coralsafari.png';
import loginJson from './helpers/login.json';

const LoginPage = () => {
  const classes  = useStyles();
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const [pic, setPic] = useState(0);

  const handleChange = (value) => {
    setName(value);
    if (value.length <= 3) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  const handleSubmit = () => {
    setPic(pic + 1);
  }

  const handleFinal = () => {
    dispatch(setUser({ name: name}))
  }

  return (
    <>
        {pic === 1 &&
          <>
            <Grid container spacing={0} justifyContent="center" alignItems="stretch" className={classes.bg}>
              <Paper variant="outlined" className={classes.articleContainer} style={{textAlign: "center"}}>
                <Box className={classes.headingBox}>
                  <h3 className={classes.head}>The Coral Safari</h3>
                </Box>
                <Paper variant="outlined" style={{width: '75%', marginLeft: '12.5%'}}>
                </Paper>
                <Box className={classes.headingBox}>
                  <h2 className={classes.subHead}>Thank you for helping us save our reefs</h2>
                </Box>
                <p className={classes.body}>
                  {loginJson.line1}
                </p>
                <p className={classes.body}>
                  {loginJson.line3}
                </p>
                <p className={classes.body}>
                  {loginJson.line2}
                </p>
                <Box className={classes.headingBox}>
                  <h2 className={classes.subHead}>Start off by tagging a lionfish</h2>
                </Box>
                <Link to={"/"}>
                  <Button style={{marginBottom: "2rem"}} variant="outlined" className={classes.moveButt} onClick={handleFinal}>Enter</Button>
                </Link>
              </Paper>
            </Grid>
          </>
        }
        {pic === 0 &&
        <Grid container spacing={0} direction="column" justifyContent="center" alignItems="center" className={classes.bg}>
          <div>
            <Grid item className={classes.container}>
              <img src={lionlogo} alt="" className={classes.logo}/>
            </Grid>
            <Grid item className={classes.container}>
              <img src={coralSafari} alt="" className={classes.coralWords}/>
            </Grid>
            <div className={classes.instructions}>
              Please enter your name below. It will be used to create tags and will be visible to the public.
            </div>
            <Grid item className={classes.container}>
              <div className={classes.nameDiv}>
                <TextField label="Your Name" name="name" id="name" variant='outlined' fullWidth className={classes.loginBox} onChange={e => handleChange(e.target.value)}/>
              </div>
            </Grid>
            <div style={{textAlign: "center"}}>
              <Button disabled={disabled} className={classes.submitButton} onClick={handleSubmit}>Sign In!</Button>
            </div>
          </div>
        </Grid>}
    </>
  )
}

export default LoginPage;
