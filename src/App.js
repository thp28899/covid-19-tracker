import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import { useState, useEffect, useContext } from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './utils';
import LineGraph from './components/LineGraph';
import CountryContext from './utils';

function App() {
  const baseUrl = 'https://disease.sh/v3/covid-19/';

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 24.80746, lng: 0.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const countryCtx = useContext(CountryContext);
  const [casesType, setCasesType] = useState('cases');

  const [days, setDays] = useState('30');
  const daysAvail = ['30', '60', '120', 'all'];

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

          setTableData(sortData(data));

          setMapCountries(data);
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

        setMapCenter({
          lat: data.countryInfo?.lat || 24.80746,
          lng: data.countryInfo?.long || 0.4796,
        });

        countryCode === 'worldwide' ? setMapZoom(2) : setMapZoom(4);

        data.country
          ? countryCtx.selectCountry(data.country)
          : countryCtx.selectCountry('worldwide');
      });
  };

  // console.log('zzzzzzzzzzzzzzzzzzzz', countryInfo);

  // BEM naming convention
  return (
    <div>
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
                <MenuItem value="worldwide" key="worldwide">
                  Worldwide
                </MenuItem>

                {countries.map((country) => (
                  <MenuItem value={country.value} key={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox
              title="Coronavirus cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases).split('+')[1]}
              onClick={() => setCasesType('cases')}
              active={casesType === 'cases'}
              casesType="cases"
            />
            <InfoBox
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered).split('+')[1]}
              onClick={() => setCasesType('recovered')}
              active={casesType === 'recovered'}
              casesType="recovered"
            />
            <InfoBox
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths).split('+')[1]}
              onClick={() => setCasesType('deaths')}
              active={casesType === 'deaths'}
              casesType="deaths"
            />
          </div>

          <Map
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
            casesType={casesType}
          />
        </div>

        <Card className="app__right">
          <CardContent className="app__right__content">
            <h4>All cases recorded by country</h4>
            <Table countries={tableData} />

            <div className="app__right__da">
              <h4>Worldwide new {casesType}</h4>
              <FormControl>
                <Select
                  value={days}
                  onChange={(event) => setDays(event.target.value)}
                >
                  {daysAvail.map((da) => (
                    <MenuItem value={da} key={da}>
                      {da} days
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <LineGraph casesType={casesType} days={days} />
          </CardContent>
        </Card>
      </div>
      <div className="dataReference">Data from: <u>https://disease.sh/</u></div>
      <div className="dataReference">Code reference: <u>https://www.youtube.com/watch?v=cF3pIMJUZxM</u></div>
      <div className="dataReference">Contact me: <u>https://www.linkedin.com/in/thp28899</u></div>
    </div>
  );
}

export default App;
