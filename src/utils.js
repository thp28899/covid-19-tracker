import { createContext, useState } from 'react';
import numeral from 'numeral';

export const sortData = (data) => {
  data.sort((a, b) => {
    return b.cases - a.cases;
  });

  return data;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';

const CountryContext = createContext({
  selectedCountry: '',
});

export const CountryContextProvider = (props) => {
  const [country, setCountry] = useState('');

  const selectCountryHandler = (country) => {
    setCountry(country);
  };

  const context = {
    selectedCountry: country,
    selectCountry: selectCountryHandler,
  };

  return (
    <CountryContext.Provider value={context}>
      {props.children}
    </CountryContext.Provider>
  );
};

export default CountryContext;
