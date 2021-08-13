import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import './LineGraph.css';

function LineGraph({ casesType, days }) {
  const [data, setData] = useState([]);

  const colorCasesType =
    casesType === 'cases'
      ? '#cc1034'
      : casesType === 'deaths'
      ? 'gray'
      : '#478604';

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log('pppppp', data);
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType, days]);

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

  return (
    <div className="graph">
      <Line
        data={{
          datasets: [
            {
              backgroundColor: colorCasesType,
              borderColor: colorCasesType,
              data: data,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
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
