import { useState, useContext, useEffect } from 'react';
import { Circle, InfoWindow } from '@react-google-maps/api';
import numeral from 'numeral';
import './DataOnMap.css';
import CountryContext from '../utils';

const circleVisual = {
  cases: {
    hex: '#cc1034',
    multiplier: 0.03,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 0.03,
  },
  deaths: {
    hex: '#c0c0c0',
    multiplier: 1,
  },
};

function DataOnMap(props) {
  const [infoWindowState, setInfoWindowState] = useState(false);

  const countryCtx = useContext(CountryContext);
  useEffect(() => {
    countryCtx.selectedCountry === props.country.country &&
      setInfoWindowState(true);
  }, [countryCtx.selectedCountry, props.country.country]);

  return (
    <>
      {props.mapDrawingsMode === 'circle' && (
        <Circle
          center={{
            lat: props.country.countryInfo.lat,
            lng: props.country.countryInfo.long,
          }}
          options={{
            strokeColor: circleVisual[props.casesType].hex,
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: circleVisual[props.casesType].hex,
            fillOpacity: 0.35,
            clickable: true,
            draggable: false,
            editable: false,
            visible: true,
            radius:
              props.country[props.casesType] *
                circleVisual[props.casesType].multiplier >
              15000
                ? props.country[props.casesType] *
                  circleVisual[props.casesType].multiplier
                : 15000,
            zIndex: 1,
          }}
          onClick={() => setInfoWindowState(true)}
        />
      )}

      {infoWindowState && (
        <InfoWindow
          position={{
            lat: props.country.countryInfo.lat,
            lng: props.country.countryInfo.long,
          }}
          onCloseClick={() => setInfoWindowState(false)}
        >
          <div className="info-container">
            <div
              className="info-flag"
              style={{
                backgroundImage: `url(${props.country.countryInfo.flag})`,
              }}
            />

            <div className="info-name">{props.country.country}</div>

            <div className="info-cases">
              Cases: {numeral(props.country.cases).format('0,0')}
            </div>

            <div className="info-recovered">
              Recovered: {numeral(props.country.recovered).format('0,0')}
            </div>

            <div className="info-deaths">
              Deaths: {numeral(props.country.deaths).format('0,0')}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default DataOnMap;
