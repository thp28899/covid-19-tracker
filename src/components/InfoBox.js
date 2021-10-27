import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

function InfoBox(props) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${props.active && 'infoBox--selected'} ${
        props.casesType === 'cases' && 'infoBox--red'
      } ${props.casesType === 'deaths' && 'infoBox--gray'}`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {props.title}
        </Typography>

        <h2
          className={`infoBox__cases ${
            props.casesType === 'cases' && 'infoBox__cases--red'
          } ${props.casesType === 'deaths' && 'infoBox__cases--gray'}`}
        >
          {props.cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {props.total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
