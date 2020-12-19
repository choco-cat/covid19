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

const prepereOptions = (data, statuses) => {
  return {
    title: '',
    hAxis: {title: "Days", viewWindow: {min: 1, max: data.length}},
    vAxis: {title: "Number of people by time", viewWindow: {min: 0, max: calculateMaxY(data)}},
    legend: { position: 'top', maxLines: 3 },
    colors: getColors(statuses),
    chartArea: { width: '80%', height: '70%' },
    animation: {
      duration: 600,
      easing: 'out',
      startup: true,
    },
  }
};

const getColors = (statuses) => {
  let colors = [];
  statuses.forEach(status => {
    colors.push(getColor(status));
  });
  return colors;
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
};

const calculateMaxY = (data) => {
  if (!data.length) {
    return;
  }

  return data.reduce((acc, curr) => acc.Data > curr.Data ? acc : curr);
};

const prepereData = (data, status, compare) => {
  let resultArr = [];
  if (!data.length || !Array.isArray(data)) {
    return [];
  }
  if (compare) {
    resultArr.push(["Date", "Confirmed", "Recovered", "Deaths"]);
    data.forEach((el) => resultArr.push([format(new Date(el.Date), 'dd-MMM-yyyy'), el.TotalConfirmed, el.TotalRecovered, el.TotalDeaths]));
  } else {
    resultArr.push(["Date", "Number of people"]);
    data.forEach((el) => resultArr.push([format(new Date(el.Date), 'dd-MMM-yyyy'), el[status]]));
  }

  return resultArr;
};

const CovidChart = ({dataWorld, status, compare}) => {

  const correctData = prepereData(dataWorld, status, compare);
  const statuses = compare ? [filters.status.confirmed, filters.status.recovered, filters.status.deaths] : [status];
  const correctOptions = prepereOptions(dataWorld, statuses);

  return correctData.length ? (
    <Chart
      chartType="AreaChart"
      data={correctData}
      options={correctOptions}
      graphID="ScatterChart"
      className="chart"
      chartEvents={chartEvents}
     />
  ) : null;
};

export default CovidChart;
