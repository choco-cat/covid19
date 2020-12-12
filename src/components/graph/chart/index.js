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
  title: "Кол-во заболевших по датам",
  hAxis: { title: "Дни", viewWindow: { min: 1, max: 244 } },
  vAxis: { title: "Кол-во заболевших", viewWindow: { min: 0, max: 5000000 } },
  legend: "none",
  animation: {
    duration: 1000,
    easing: 'out',
    startup: true,
  },
};

const prepereData = (data) => {
  const resultArr = [];
  resultArr.push(["Date", "Кол-во заболевших"]);
  if(Array.isArray(data)) {
    data.forEach((el, index) => resultArr.push([index, el.TotalDeaths]));
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
      height="400px"
      chartEvents={chartEvents}
    />
  );
};

export default CovidChart;