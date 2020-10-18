import React, { useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// Create the script tag, set the appropriate attributes
let script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6mTx0H1D-UWBlDd84KtMDALeJAO8SjOE&callback=initMap";
script.defer = true;

const mapsReady = new Promise((resolve) => {
  (window as any).initMap = resolve;
});

// Append the 'script' element to 'head'
document.head.appendChild(script);

const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },

  map: {
    height: "100%",
    width: "100%",
  },

  nextScreen: {
    position: "absolute",
    zIndex: 9999,
    width: "100%",
    bottom: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function Map({ next }: { next?: () => void }) {
  const mapRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    mapsReady.then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(center);

          new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0,
            map,
            center,
            radius: 500,
          });
        });
      }
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.map} ref={mapRef} />
      <div className={classes.nextScreen}>
        <Button size="large" variant="contained" color="primary" onClick={next}>
          Дальше
        </Button>
      </div>
    </div>
  );
}
