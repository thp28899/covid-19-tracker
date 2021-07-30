import React from 'react';
import './Table.css';

function Table(props) {
  return (
    <div className="table">
      {props.countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
