import React from 'react';
import './Table.css';
import numeral from 'numeral';

function Table(props) {
  return (
    <table className="table">
      <tbody>
        {props.countries.map(({ country, cases }) => (
          <tr key={country}>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format('0,0')}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
