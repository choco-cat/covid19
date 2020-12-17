import React from 'react';
import {Chart} from 'react-google-charts';
import {format} from 'date-fns';
import {filters} from '../../../constants/filters';

const chartEvents = [
  {
    eventName: "select",
    callback({chartWrapper}) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    }
  }
];

const prepereOptions = (data, status) => {
  return {
    title: '',
    hAxis: {title: "Days", viewWindow: {min: 1, max: data.length}},
    vAxis: {title: "Number of people by time", viewWindow: {min: 0, max: calculateMaxY(data)}},
    legend: "none",
    colors: [getColor(status)],
    animation: {
      duration: 600,
      easing: 'out',
      startup: true,
    },
  }
};


const getColor = (status) => {
  let color;
  switch (status) {
    case filters.status.recovered:
      color = '#34f5ae';
      break;
    case filters.status.deaths:
      color = '#f50000';
      break;
    default:
      color = '#f5ab06';
      break;
  }
  return color;
}

const calculateMaxY = (data) => {
  if (!data.length) {
    return;
  }

  return data.reduce((acc, curr) => acc.Data > curr.Data ? acc : curr);
};

const prepereData = (data) => {
  const resultArr = [];
  resultArr.push(["Month", "Number of people"]);

  if (Array.isArray(data)) {
    //TODO шкалу Х подписать как месяцы
    //data.forEach((el, index) => resultArr.push([format(new Date(el.Date),'MMM'), el.Data]));
    data.forEach((el) => resultArr.push([format(new Date(el.Date), 'dd-MMM-yyyy'), el.Data]));
  }

  return resultArr;
};

const CovidChart = ({dataWorld, status}) => {

  const correctData = prepereData(dataWorld);
  const correctOptions = prepereOptions(dataWorld, status);

  return (
    <Chart
      chartType="AreaChart"
      data={correctData}
      options={correctOptions}
      graphID="ScatterChart"
      width="100%"
      height="320px"
      chartEvents={chartEvents}
    />
  );
};

export default CovidChart;
