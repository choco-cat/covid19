import React from 'react';
import { Chart } from 'react-google-charts';

const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    }
  }
];

const options = {
    title: '',
    hAxis: { title: "Days", viewWindow: { min: 1, max: 330 }},
    vAxis: { title: "Number of people by time", viewWindow: { min: 0, max: 20000000 } },
    legend: "none",
    animation: {
      duration: 1000,
      easing: 'out',
      startup: true,
    },
};

const prepereData = (data) => {
  const resultArr = [];
  resultArr.push(["Date", "Number of people"]);

  if(Array.isArray(data)) {
    data.forEach((el, index) => resultArr.push([index, el.Data]));
  }

  return resultArr;
};

const CovidChart = ({ dataWorld }) => {
  const correctData = prepereData(dataWorld);

  return (
    <Chart
      chartType="AreaChart"
      data={correctData}
      options={options}
      graphID="ScatterChart"
      width="100%"
      height="320px"
      chartEvents={chartEvents}
    />
  );
};

export default CovidChart;