import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getAllTags, uploadTag, checkWater, addLikeOrDislike } from '../../actions/map/MapActions';

import { Grid, Box, Button, TextField, IconButton } from '@material-ui/core';
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import useStyles from './style';
import lionTag from './helpers/liontag.png';
import lionSearchTag from './helpers/lionsearchtag.png';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { getGeocode, getLatLng } from "use-places-autocomplete";

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

const MapPage = () => {
  //Misc variables
  const classes  = useStyles();
  const [renderToggler, setRender] = useState(false);
  const user = useSelector(state => state.user);

  //google api related variables
  const google = window.google;
  const src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
  const windowSize = useWindowSize();
  const containerStyle = {
    width: `${windowSize.width}px`,
    height: `${windowSize.height}px`,
  };
  const [hasListener, setListener] = useState(false);
  const [zoom, setZoom] = useState(8);
  const [mapPosition, setPosition] = useState({
    lat: 26.640204,
    lng: -81.163291
  });
  const [api, setAPI] = useState(undefined);
  const [setupApi, haveSetupApi] = useState(false);

  //marker variables
  const [markers, setMarkers] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);
  const [thumbUpPressed, setThumbUp] = useState([]);
  const [thumbDownPressed, setThumbDown] = useState([]);
  const [newRenderedMarker, setNewRenderedMarker] = useState(null);
  const [displayInfoWindow, setInfoWindowDisplay] = useState(null);
  const [markerToggle, setMarkerToggle] = useState(false);

  //tag form variables
  const formRef = useRef(null);
  const initialValues = {
    location: "",
    depth: "",
    numSpotted: "",
    numCaught: ""
  };
  const tagSchema = Yup.object().shape({
    location: Yup.string().required("Please enter the name of the area this point is in"),
    depth: Yup.string().required("Please enter the rough water depth in this area"),
    numSpotted: Yup.string()
                .required("Please enter the number of lionfish\nspotted as a number")
                .matches(/^[0-9]+$/, "Please enter the number of lionfish\nspotted as a number"),
    numCaught: Yup.string()
                .required("Please enter the number of lionfish\nbagged as a number")
                .matches(/^[0-9]+$/, "Please enter the number of lionfish\nbagged as a number")
  });

  //search variables
  const searchRef = useRef(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchRefresh, setSearchRefresh] = useState("true");

  useEffect(() => {
    const getTags = async () => {
      let response = await getAllTags();
      setMarkers(response);
    }
    if (!document.getElementById("googleApi")) {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.defer = true;
        script.id = "googleApi";
        document.body.appendChild(script);
        setRender(!renderToggler);
    } else if (typeof google === "undefined") {
        setRender(!renderToggler);
    } else if (!setupApi) {
        setAPI(new google.maps.places.Autocomplete(document.getElementById("mapSearchBar"), {}));
        haveSetupApi(true);
    } else if (api && !hasListener) {
        api.addListener("place_changed", handleSearchEvent);
        setListener(true);
    }
    if (markers === null) {
        getTags();
    }
    if (markerToggle) {
      setMarkerToggle(false);
      handleTagSubmit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderToggler, searchRefresh, api, google, src, hasListener, setupApi, markers, markerToggle]);

  const handleDoubleClick = async (e) => {
    let onWater = false;

    onWater = await checkWater({ lat: e.latLng.lat(), lng: e.latLng.lng() });

    placeNewMarker(onWater, { lat: e.latLng.lat(), lng: e.latLng.lng() });
  }

  function handleMapLoad(map) {
    map.set("disableDoubleClickZoom", true);
    google.maps.event.addListener(map, 'dblclick', async (event) => {
      handleDoubleClick(event);
    });
  }

  const refreshAutocomplete = e => {
        setSearchRefresh(document.getElementById("mapSearchBar").value);
  };

  const handleSearchEvent = () => {
    handleSelect(searchRef.current.value)
  }

  const handleSelect = (search) => {
    let searchObject = api.getPlace();
    if (searchObject && searchObject.geometry) {
      let lat = (searchObject.geometry.viewport.tc.g + searchObject.geometry.viewport.tc.i) / 2;
      let lng = (searchObject.geometry.viewport.Hb.g + searchObject.geometry.viewport.Hb.i) / 2;

      setPosition({ lat, lng});
      setSearchMarker({ lat, lng });
      setHasSearched(true);
      setZoom(12);
    } else {
      handleSearch(search);
    }
  };

  const handleSearch = (search) => {

    let position;

    if (search.includes(",")) {
      position = search.split(",");
    } else {
      position = search.split(" ");
    }

    if (position.length === 2 && !isNaN(parseFloat(position[0])) && !isNaN(parseFloat(position[1]))) {
      setPosition({
        lat: parseFloat(position[0]),
        lng: parseFloat(position[1]),
      });
      setSearchMarker({ lat: parseFloat(position[0]), lng:parseFloat(position[1]) });
      setHasSearched(true);
      setZoom(12);
    } else {
      getGeocode({ address: search })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setPosition({ lat, lng });
          setSearchMarker({ lat, lng });
          setHasSearched(true);
          setZoom(12);
        })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
    }

  }

  const handleTagSubmit = async () => {
    let coords = document.getElementById("coords").value;
    coords = coords.split(",");
    let lat = parseFloat(coords[0].replace(/\s/g, ''));
    let lng = parseFloat(coords[1].replace(/\s/g, ''));

    if (markers) {
      let newMarkers = markers;
      newMarkers.push({ coordinates: { lat: lat, lon: lng }});
      setMarkers(newMarkers);
    } else {
      setMarkerToggle(true);
      return;
    }

    await uploadTag(document.getElementById("tagger").value, coords, document.getElementById("location").value, document.getElementById("depth").value, document.getElementById("numSpotted").value, document.getElementById("numCaught").value);

    setRender(!renderToggler);
    setNewRenderedMarker(
          <InfoWindow onCloseClick={() => {setInfoWindowDisplay(null);}} className={classes.infoWindow} position={{ lat: lat, lng: lng }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={5}>
                <h1 style={{fontSize:'1.5rem', marginLeft: "5.25rem"}}>Success!</h1>
              </Grid>
              <div style={{marginLeft: '1rem', marginBottom: '1rem', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'}} >Your tag has been submitted! If the tag does not appear automatically or appears with missing or incorrect information, please refresh the page. Tags may take up to a few minutes to appear. </div>
            </Grid>
          </InfoWindow>
    );
  }

  const placeNewMarker = async (onWater, newMarker) => {
    const tagCoords = (`${newMarker.lat}, ${newMarker.lng}`);

    if (onWater) {
      setPosition(newMarker);
      setInfoWindowDisplay("newMarker");
      setNewRenderedMarker(
        <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={tagSchema}
        >
          {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty
          }) => (
            <InfoWindow onCloseClick={() => {setInfoWindowDisplay(null);}} className={classes.infoWindow} position={newMarker}>
              <Box pt={0.5}>
                <TextField value={user.name} label="Your Name" name="tagger" id="tagger" variant='filled' disabled={true} fullWidth className={classes.tagInput} onChange={handleChange('tagger')} onBlur={handleBlur('tagger')}/>
                <TextField value={tagCoords} label="Coordinates" id="coords" variant="filled" disabled={true} fullWidth className={classes.tagInput} />
                <TextField label="Location Name" name="location" id="location" variant='outlined' fullWidth className={classes.tagInput} onChange={handleChange('location')} onBlur={handleBlur('location')}/>
                {(errors.location && touched.location) &&
                  <h6 className={classes.errorMessage}>{errors.location}</h6>
                }
                <TextField label="Water Depth" name="depth" id="depth" variant='outlined' fullWidth className={classes.tagInput} onChange={handleChange('depth')} onBlur={handleBlur('depth')} />
                {(errors.depth && touched.depth) &&
                  <h6 className={classes.errorMessage}>{errors.depth}</h6>
                }
                <Box>
                  <TextField label="Number of Lionfish Spotted" name="numSpotted" id="numSpotted" variant='outlined' style={{width: '50%'}} className={classes.tagInput} onChange={handleChange('numSpotted')} onBlur={handleBlur('numSpotted')} />
                  {(errors.numSpotted && touched.numSpotted) &&
                    <h6 className={classes.errorMessage}>{errors.numSpotted}</h6>
                  }
                  <TextField label="Number of Lionfish Bagged" name="numCaught" id="numCaught" variant='outlined'  style={{width: '50%'}} className={classes.tagInput} onChange={handleChange('numCaught')} onBlur={handleBlur('numCaught')} />
                  {(errors.numCaught && touched.numCaught) &&
                    <h6 className={classes.errorMessage}>{errors.numCaught}</h6>
                  }
                </Box>
                <Box pt={0.5} display="flex" alignItems="center" justifyContent="center">
                  <Button disabled={!(isValid && dirty)} type="submit" variant="outlined" className={classes.tagSubmitButton} onClick={handleTagSubmit}>Submit Sighting!</Button>
                </Box>
              </Box>
            </InfoWindow>
          )}
        </Formik>
      );
    } else {
      setPosition(newMarker);
      setInfoWindowDisplay("newMarker");
      setNewRenderedMarker(
        <InfoWindow onCloseClick={() => {setInfoWindowDisplay(null);}} className={classes.infoWindow} position={newMarker}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={5}>
              <h1 style={{fontSize:'1.5rem', marginLeft: "5.25rem", fontColor:'blue'}}>Uh Oh!</h1>
            </Grid>
            <div style={{alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'}} >This point appears to be on land. Please select a point on water. </div>
          </Grid>
        </InfoWindow>
      );
    }
  };

  const handleLikes = async (index, isLike, id, numLikes) => {
    await addLikeOrDislike(isLike, id, numLikes);
    if (isLike) setThumbUp(thumbUpPressed.concat([index]))
    if (!isLike) setThumbDown(thumbDownPressed.concat([index]))
  }

  return (
    <React.Fragment>
      <Grid container justifyContent = "center" className={windowSize.width < 750 ? classes.searchBarMobile : classes.searchBar}>
        <div className={classes.searchBarBackground}>
          <TextField inputRef={searchRef} label="Search" id={"mapSearchBar"} variant='outlined' fullWidth onInput={refreshAutocomplete}/>
        </div>
        <Box pl={0.5} height="98%">
          <Button onClick={handleSearchEvent} color="primary" variant="contained" startIcon={<SearchOutlinedIcon className={classes.searchIcon}/>} className={classes.searchButton}></Button>
        </Box>
      </Grid>

      { setupApi && <Grid container justifyContent = "center" className={classes.mapContainer}>
          <GoogleMap
            className={classes.mapContainer}
            onLoad={handleMapLoad}
            mapContainerStyle={containerStyle}
            center={mapPosition}
            zoom={zoom}
            id="map"
            InputProps={{
              className: classes.input,
            }}
          >
            {displayInfoWindow === "newMarker" && newRenderedMarker}

            {markers !== null && setupApi && markers.map((marker,index) => (
              <Marker
                className={classes.searchMarker}
                key={index}
                position={{ lat: marker.coordinates.lat, lng: marker.coordinates.lon }}
                icon={{
                  url: lionTag,
                  scaledSize: new google.maps.Size(125, 75),
                }}
                onClick={() => {
                  setZoom(12);
                  setPosition({ lat: marker.coordinates.lat, lng: marker.coordinates.lon });
                  setInfoWindowDisplay(index);
                }}
              >
                {displayInfoWindow === index && <InfoWindow onCloseClick={() => setInfoWindowDisplay(null)} className={classes.infoWindow}>
                  <>
                    <div>
                    Tagger: {markers[displayInfoWindow].tagger} <br />
                    Coordinates: {markers[displayInfoWindow].coordinates.lat} , {markers[displayInfoWindow].coordinates.lon}<br />
                    Area Name: {markers[displayInfoWindow].location} <br />
                    Water Depth: {markers[displayInfoWindow].waterDepth} <br />
                    Number of Lionfish Spotted: {markers[displayInfoWindow].numSpotted} <br />
                    Number of Lionfish Caught: {markers[displayInfoWindow].numCaught} <br />
                    </div>
                    {marker.sys &&
                    (<>
                      <IconButton disabled={thumbDownPressed.includes(index) ? true: false} color={thumbUpPressed.includes(index) ? 'secondary': 'primary'} onClick={() => handleLikes(index, true, marker.sys.id, marker.likes)}>
                        <ThumbUpIcon />
                      </IconButton>
                      <IconButton disabled={thumbUpPressed.includes(index) ? true: false} color={thumbDownPressed.includes(index) ? 'secondary': 'primary'} onClick={() => handleLikes(index, false, marker.sys.id, marker.dislikes)}>
                        <ThumbDownIcon />
                      </IconButton>
                      </>)
                    }
                  </>
                </InfoWindow>
                }
              </Marker>
            ))}
            {hasSearched && <Marker
              className={classes.searchMarker}
              position={searchMarker}
              icon={{
                url: lionSearchTag,
                scaledSize: new google.maps.Size(150, 100),
              }}
              onClick={() => setHasSearched(false)}
            />}

          </GoogleMap>
      </Grid>}
    </React.Fragment>
  );

}

export default MapPage;
