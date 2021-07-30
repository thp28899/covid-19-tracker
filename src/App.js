import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { sortData } from './utils';
import LineGraph from './components/LineGraph';

function App() {
  const baseUrl = 'https://disease.sh/v3/covid-19/';

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getWorldwideData = async () => {
      await fetch(`${baseUrl}all`)
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };

    getWorldwideData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`${baseUrl}countries`)
        .then((response) => response.json())
        .then((data) => {
          const countriesData = data.map((countryData) => ({
            name: countryData.country,
            value: countryData.countryInfo.iso2,
          }));

          setCountries(countriesData);

          const countriesCases = data.map((countryData) => ({
            country: countryData.country,
            cases: countryData.cases,
          }));

          const sortedData = sortData(countriesCases);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log('qqqqqqqqqq', countryCode);
    setCountry(countryCode);

    const url =
      countryCode === 'worldwide'
        ? `${baseUrl}all`
        : `${baseUrl}countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  // console.log('zzzzzzzzzzzzzzzzzzzz', countryInfo);

  // BEM naming convention
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />

          <h3>Worldwide new cases</h3>
          <LineGraph casesType="cases" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
