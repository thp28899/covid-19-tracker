import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Map.css';
import { Card, CardContent } from '@material-ui/core';
import DataOnMap from './DataOnMap';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCc-EsvzIi-fvx3sZLYUML659aIzodUQhE',
  });

  return isLoaded ? (
    <Card className="map__card">
      <CardContent className="map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.center}
          zoom={props.zoom}
        >
          {props.countries.map((country) => (
            <DataOnMap
              country={country}
              casesType={props.casesType}
              key={country.country}
            />
          ))}
        </GoogleMap>
      </CardContent>
    </Card>
  ) : (
    <></>
  );
}

export default Map;
