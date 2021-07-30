import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
// import numeral from 'numeral';

function LineGraph({ casesType }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => response.json())
        .then((data) => {
          console.log('pppppp', data);
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };

        chartData.push(newDataPoint);
      }

      lastDataPoint = data[casesType][date];
    }

    return chartData;
  };

  // const options = {
  //   legend: {
  //     display: false,
  //   },
  //   elements: {
  //     point: {
  //       radius: 0,
  //     },
  //   },
  //   maintainAspectRatio: false,
  //   tooltips: {
  //     mode: 'index',
  //     intersect: false,
  //     callbacks: {
  //       label: function (tooltipItem) {
  //         return numeral(tooltipItem.value).format('+0,0');
  //       },
  //     },
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         type: 'time',
  //         time: {
  //           format: 'DD/MM/YY',
  //           tooltipFormat: 'll',
  //         },
  //       },
  //     ],
  //     yAxes: [
  //       {
  //         gridLines: {
  //           display: false,
  //         },
  //         ticks: {
  //           // include a dollar sign in the ticks
  //           callback: function (value, index, values) {
  //             return numeral(value).format('0a');
  //           },
  //         },
  //       },
  //     ],
  //   },
  // };

  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              backgroundColor: 'rgba(204, 16, 52, 0.5)',
              borderColor: '#cc1034',
              data: data,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                displayFormats: {
                  quarter: 'MMM YYYY',
                },
                tooltipFormat: 'MMM DD, YYYY',
              },
            },
          },
          elements: {
            point: {
              radius: 1,
              hitRadius: 2,
            },
            line: {
              borderWidth: 1,
            },
          },
        }}
      />
    </div>
  );
}

export default LineGraph;