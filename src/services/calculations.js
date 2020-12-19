import { endOfToday } from "date-fns";
import { format } from 'date-fns';
import {filters} from "../constants/filters";

const populationWorld = 7 * 10 ** 9;

/*
Возвращает статистику всех статусов по стране по всем датам на 100 тыс. населения, массив объектов вида
{
Country: "China",
CountryCode: "",
CityCode: "",
Lat: "0",
Lon: "0",
Confirmed: 0.08,
Deaths: 0.056,
Recovered: 0.023,
Date: "2020-12-10T00:00:00Z"
}
country_slug = название страны, все маленькие буквы
*/

const calc100Men = (data, population) => {
  return data.map((el) => ({
    TotalConfirmed: Math.round(el.TotalConfirmed / (population / 10 ** 5) * 100) / 100,
    TotalDeaths: Math.round(el.TotalDeaths / (population / 10 ** 5) * 100) / 100,
    TotalRecovered: Math.round(el.TotalRecovered / (population / 10 ** 5) * 100) / 100,
    NewConfirmed: Math.round(el.NewConfirmed / (population / 10 ** 5) * 100) / 100,
    NewDeaths: Math.round(el.NewDeaths / (population / 10 ** 5) * 100) / 100,
    NewRecovered: Math.round(el.NewRecovered / (population / 10 ** 5) * 100) / 100,
    Date: el.Date,
  }));
};


/*Итоговые данные по миру, объект вида
 {
  NewConfirmed: 623213, //Последний день
  TotalConfirmed: 71694121,
  NewDeaths: 10224, //Последний день
  TotalDeaths: 1604878,
  NewRecovered: 1506921, //Последний день
  TotalRecovered: 46848398
} */
/*
  filters: status = 'TotalConfirmed', relative = 'Absolute', period = 'lastDay'
*/

export const getDataWorldLastDay = (data, filters) => {
  if (!data) {
    return;
  }

  const currentDate = endOfToday();
  let result = [...data];

  if (filters.relative === 'To100men') {
    result = calc100Men(result, populationWorld);
  }

   result = result.map((el) => {
    return { Date: currentDate, Data: el[filters.status] };
  });

  return result;
};

//Данные для мира и по выбранной стране по дням
export const getData = (data, filters, population = populationWorld) => {
  if (!data) {
    return;
  }

  let result = [...data];
  let filtersStatus = filters.status;
  let currentDate = false;

  //Данные за последний  день
  if(result.length === 1) {
    currentDate = endOfToday();
    filtersStatus = filters.status.replace('Total', 'New');
  }
  if (filters.relative === 'To100men') {
    result = calc100Men(result, population);
  }

  result = result.map((el) => {
    //Костыль, что-то не так со статистикой в API у Китая в один день
    if(filters.geography === 'China' && el.TotalConfirmed > 6000000) {
      el.TotalConfirmed = 90100;
    }
    return { Date: currentDate ? format(new Date(currentDate), 'dd-MMM-yyyy') : format(new Date(el.Date),'dd-MMM-yyyy'), ...el};
  });

  return result;
};

export const getDataCountries = (data, globalFilters) => {
  if (!data) {
    return;
  }

  let result = [...data];
  let filtersStatus = globalFilters.status;
  let currentDate;
  //Данные за последний день, передать сюда константу filters
  if(globalFilters.period === filters.period.lastDay) {
    currentDate = endOfToday();
    filtersStatus = globalFilters.status.replace('Total', 'New');
  }
  result = result.map((el) => {
    return { Data: el[filtersStatus], ...el };
  });

  if (globalFilters.relative === 'To100men') {
    result = result.map((el) => {
      return {
    ...el,
     Data: Math.round( el.Data / (el.population / 10 ** 5) * 100) / 100
     }});
  }

  return result;
};

export const getColorsFromFilters = (status) => {
  let color;
  switch (status) {
    case filters.status.recovered:
      color = `52,245,174`;
      break;
    case filters.status.deaths:
      color =  `144,73,0`;
      break;
    default:
      color =  `245,0,0`;
      break;
  }
  return color;
};