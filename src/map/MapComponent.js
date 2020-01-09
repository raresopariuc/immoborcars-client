import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";

export const MapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAq0t08ZFp_WpsskWGXdaC4Ft4q-zRXq0A&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, marginTop: `10px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={15}
        center={{ lat: props.lat, lng: props.lng }}
    >

        <Marker position={{ lat: props.lat, lng: props.lng }}/>
    </GoogleMap>
);