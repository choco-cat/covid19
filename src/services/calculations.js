import { endOfToday } from "date-fns";

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
    TotalConfirmed: el.TotalConfirmed / (population / 10 ** 5),
    TotalDeaths: el.TotalDeaths / (population / 10 ** 5),
    TotalRecovered: el.TotalRecovered / (population / 10 ** 5),
    NewConfirmed: el.NewConfirmed / (population / 10 ** 5),
    NewDeaths: el.NewDeaths / (population / 10 ** 5),
    NewRecovered: el.NewRecovered / (population / 10 ** 5),
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
// TODO Combine getDataCountry and getDataWorld in one function
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
    return { Date: currentDate ? currentDate : el.Date, Data: el[filtersStatus] };
  });

  return result;
};

