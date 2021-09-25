import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useStyles from './style';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { FaBars, FaMapMarkedAlt, FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';
import { GiFishingPole, GiKnifeFork } from 'react-icons/gi';
import { RiKnifeLine } from 'react-icons/ri';
import { IconButton, Drawer, Hidden, Toolbar } from '@material-ui/core';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import lionLogo from './helpers/lionlogo.png';

const Navbar = ({ container }) => {
  const classes  = useStyles();
  const [displayMenu, setDisplay] = useState(false);

  const handleDrawerToggle = () => {
        setDisplay(!displayMenu);
  };

  return (
    <>
      <Toolbar className={classes.topBar}>
        <IconButton onClick={() => {setDisplay(!displayMenu)}}>
          <FaBars className={classes.icons}/>
        </IconButton>
        <Grid container spacing={2} justifyContent="flex-end">
          <Link to={"/"}>
            <img alt="#" width="200px" src={lionLogo} className={classes.logo}/>
          </Link>
        </Grid>
      </Toolbar>
      <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden xsDown implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={"left"}
                    open={displayMenu}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <Box className={classes.menuPopout}>
                        <Box m={3}>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Grid item>
                                  <IconButton onClick={() => setDisplay(!displayMenu)}>
                                        <IoIosCloseCircleOutline className={classes.exit}/>
                                  </IconButton>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <img alt="#" width="200px" src={lionLogo} className={classes.menuLogo}/>
                            </Grid>
                            <Grid container spacing={2}>
                              <Box>
                                <h3 style={{color: "#FF9900", fontSize: "1.5rem"}}><br />Coral Safari</h3>
                                <h3 style={{color: "white"}}>We're hunting lion(fish)</h3>
                              </Box>
                            </Grid>
                        </Box>
                        <List>
                          <Link to={"/"}>
                            <ListItem button key="map" onClick={() => setDisplay(!displayMenu)} className={classes.menuOptions}>
                                <ListItemIcon>
                                    <FaMapMarkedAlt className={classes.icons}/>
                                </ListItemIcon>
                                <ListItemText primary={"Home"} className={classes.menuText} />
                            </ListItem>
                          </Link>
                          <Link to={"/catch"}>
                            <ListItem button key="catch" onClick={() => setDisplay(!displayMenu)} className={classes.menuOptions}>
                                <ListItemIcon>
                                    <GiFishingPole className={classes.icons}/>
                                </ListItemIcon>
                                <ListItemText primary={"Catch"} className={classes.menuText}/>
                            </ListItem>
                          </Link>
                          <Link to={"/clean"}>
                            <ListItem button key="clean" onClick={() => setDisplay(!displayMenu)} className={classes.menuOptions}>
                                <ListItemIcon>
                                    <RiKnifeLine className={classes.icons}/>
                                </ListItemIcon>
                                <ListItemText primary={"Clean"} className={classes.menuText}/>
                            </ListItem>
                          </Link>
                          <Link to={"/cook"}>
                            <ListItem button key="cook" onClick={() => setDisplay(!displayMenu)} className={classes.menuOptions}>
                                <ListItemIcon>
                                    <GiKnifeFork className={classes.icons}/>
                                </ListItemIcon>
                                <ListItemText primary={"Cook"} className={classes.menuText}/>
                            </ListItem>
                          </Link>
                          <Link to={"/faq"}>
                            <ListItem button key="about" onClick={() => setDisplay(!displayMenu)} className={classes.menuOptions}>
                                <ListItemIcon>
                                    <FaQuestionCircle className={classes.icons}/>
                                </ListItemIcon>
                                <ListItemText primary={"FAQ"} className={classes.menuText}/>
                            </ListItem>
                          </Link>
                          <Link to={"/about"}>
                            <ListItem button key="about" onClick={() => setDisplay(!displayMenu)} className={classes.menuOptions}>
                                <ListItemIcon>
                                    <FaInfoCircle className={classes.icons}/>
                                </ListItemIcon>
                                <ListItemText primary={"About"} className={classes.menuText}/>
                            </ListItem>
                          </Link>
                        </List>
                    </Box>
                </Drawer>
            </Hidden>
        </nav>
    </>
  );
}

export default Navbar;
