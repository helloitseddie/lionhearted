import React, { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../actions/user/UserActions';

import { Grid, TextField, Button } from '@material-ui/core';

import useStyles from './style';
import lionlogo from './helpers/lionlogo.png';
import coralSafari from './helpers/coralsafari.png';
import infoD1 from './helpers/infoD1.png';
import infoD2 from './helpers/infoD2.png';
import infoM1 from './helpers/infoM1.png';
import infoM2 from './helpers/infoM2.png';

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

const LoginPage = () => {
  const classes  = useStyles();
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const [pic, setPic] = useState(0);

  const [width, setWidth] = useState(null);
  const windowSize = useWindowSize();
  const gridRef = useRef(null);

  let pictures = [infoD1, infoD2];
  if (windowSize.width < 700) {
    pictures = [infoM1,infoM2];
  }

  useEffect(() => {
    if (windowSize.width > 700) {
      setWidth((gridRef.current.offsetWidth) - 250);
    } else {
      setWidth((gridRef.current.offsetWidth) - 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const handleChange = (value) => {
    setName(value);
    if (value.length < 5) {
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
      <Grid ref={gridRef} container spacing={0} direction="column" justifyContent="center" alignItems="center" className={classes.bg}>
        {pic === 1 &&
          <>
            <Grid item className={classes.container}>
              <img src={pictures[0]} alt="" className={classes.info} width={width} height="700rem"/>
              <Grid item className={classes.container} style={{textAlign:"center"}}>
                <Button className={classes.moveButt} onClick={handleSubmit}>Got it!</Button>
              </Grid>
            </Grid>
          </>
        }
        {pic === 2 &&
          <>
            <Grid item className={classes.container}>
              <img src={pictures[1]} alt="" className={classes.info} width={width}  height="700rem"/>
              <Grid item className={classes.container} style={{textAlign:"center"}}>
                <Link to={"/"}>
                  <Button className={classes.moveButt} onClick={handleFinal}>Enter</Button>
                </Link>
              </Grid>
            </Grid>
          </>
        }
        {pic === 0 && <div>
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
        </div>}
      </Grid>
    </>
  )
}

export default LoginPage;
