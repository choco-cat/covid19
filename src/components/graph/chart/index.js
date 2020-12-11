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
const data = [
  ["Date", "Кол-во заболевших"],
  [1, 12],
  [2, 20],
  [3, 33],
  [4, 23],
  [5, 45],
  [6, 45],
  [7, 56],
  [8, 55],
  [9, 2],
  [10, 56],
  [11, 66],
  [12, 77],
  [13, 88],
  [14, 99],
  [15, 12],
  [16, 20],
  [17, 33],
  [18, 23],
  [18, 45],
  [19, 45],
  [20, 56],
];

const options = {
  title: "Кол-во заболевших по датам",
  hAxis: { title: "Дата", viewWindow: { min: 1, max: 20 } },
  vAxis: { title: "Кол-во заболевших", viewWindow: { min: 0, max: 100 } },
  legend: "none",
  animation: {
    duration: 1000,
    easing: 'out',
    startup: true,
  },
};

const CovidChart = () => {
  return (
    <Chart
      chartType="AreaChart"
      data={data}
      options={options}
      graphID="ScatterChart"
      width="100%"
      height="400px"
      chartEvents={chartEvents}
    />
  );
};

export default CovidChart;