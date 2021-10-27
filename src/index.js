import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CountryContextProvider } from './utils';

ReactDOM.render(
  <CountryContextProvider>
    <App />
  </CountryContextProvider>,
  document.getElementById('root')
);
