import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import './Map.css';
import {
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import DataOnMap from './DataOnMap';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function Map(props) {
  const [mapDrawingsMode, setMapDrawingsMode] = useState('circle');
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '',
  });

  return isLoaded ? (
    <Card className="map__card">
      <CardContent className="map">
        <div className="map__head">
          <FormControl>
            <RadioGroup
              row
              value={mapDrawingsMode}
              onChange={(event) => setMapDrawingsMode(event.target.value)}
            >
              <FormControlLabel
                value="circle"
                control={<Radio color="primary" />}
                label="Circle"
              />
              <FormControlLabel
                value="none"
                control={<Radio color="primary" />}
                label="None"
              />
            </RadioGroup>
          </FormControl>
        </div>

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
              mapDrawingsMode={mapDrawingsMode}
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
