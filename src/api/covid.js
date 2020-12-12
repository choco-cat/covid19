import axios from 'axios';
import { parse, compareAsc, format, addDays, endOfToday } from 'date-fns';
import { getPopulationCountry } from './flags';

const BASE_URL = 'https://api.covid19api.com/';

//TODO добавить обработчик ошибок

/*
Список стран
Возвращает массив из объектов вида data[n], country_slug - data[n].Slug, название страны - data[n].Country
*/
export const getCovidCountries = async () => {
  const endPointCountries = 'countries';
  const { data: countries } = await axios.get(`${BASE_URL}${endPointCountries}`);
  return countries;
};

/*
Возвращает статистику всех статусов по стране по всем датам, массив объектов вида
{
Country: "China",
CountryCode: "",
CityCode: "",
Lat: "0",
Lon: "0",
Confirmed: 94025,
Deaths: 4748,
Recovered: 87707,
Active: 1570,
Date: "2020-12-10T00:00:00Z"
}
*/
export const getDataCountry = async (country_slug) => {
  const endPointCountries = `total/country/${country_slug}`;
  const { data: summaries } =  await axios.get(`${BASE_URL}${endPointCountries}`);
  return summaries;
};

/* Возвращает данные по стране за последний день, объект типа:
{
Active: 1570
CityCode: ""
Confirmed: 94025
Country: "China"
CountryCode: ""
Date: "2020-12-10T00:00:00Z"
Deaths: 4748
Recovered: 87707
}
*/
export const getDataCountryLastDay = async (country_slug) => {
  const currentDate = endOfToday();
  const yesterday = addDays(currentDate, -1);
  const endPointCountries = `total/country/${country_slug}?from=${format(yesterday, 'Y-MM-dd')}&to=${format(currentDate,'Y-MM-dd')}`;
  const { data: summaries } =  await axios.get(`${BASE_URL}${endPointCountries}`);
  return summaries[0];
};

/* Возвращает статистику всех статусов по всему миру по всем датам, массив объектов вида
{
Date: Tue Jan 28 2020 00:01:00 GMT+0300 (Moscow Standard Time)
NewConfirmed: 87137
NewDeaths: 8726
NewRecovered: 27085
Confirmed: 2155152
Deaths: 149156
Recovered: 490147
}
*/
export const getDataWorld = async () => {
  const endPointCountries = 'world';
  const { data: summaries } =  await axios.get(`${BASE_URL}${endPointCountries}`);
  summaries.sort((a, b) => a.TotalConfirmed > b.TotalConfirmed ? 1 : -1);
  const date = parse('22-01-2020', 'dd-mm-yyyy', new Date());
  summaries.map((el, index) => {
    el.Date = addDays(date, index);
    el.Confirmed = el.TotalConfirmed;
    el.Deaths = el.TotalDeaths;
    el.Recovered = el.TotalRecovered;
    return el;
  });
  return summaries;
};

/* Возвращает данные по миру за последний день, объект типа:
{
NewConfirmed: 668755
NewDeaths: 12540
NewRecovered: 425817
Confirmed: 68884181
Deaths: 1569277
Recovered: 44373880
}
 */
export const getDataWorldLastDay = async () => {
  const currentDate = endOfToday();
  const yesterday = addDays(currentDate, -1);
  const endPointCountries = `world?from=${format(yesterday, 'Y-MM-dd')}&to=${format(currentDate,'Y-MM-dd')}`;
  const { data: summaries } =  await axios.get(`${BASE_URL}${endPointCountries}`);
  summaries.map((el) => {
    el.Date = currentDate;
    el.Confirmed = el.TotalConfirmed;
    el.Deaths = el.TotalDeaths;
    el.Recovered = el.TotalRecovered;
    return el;
  });
  return summaries[0];
};

//Итоговые данные по миру
export const getSummaries = async () => {
  const endPointCountries = 'summary';
  const { data: summaries } =  await axios.get(`${BASE_URL}${endPointCountries}`);
  summaries.Countries.map((el) => {
    el.Confirmed = el.TotalConfirmed;
    el.Deaths = el.TotalDeaths;
    el.Recovered = el.TotalRecovered;
    return el;
  });
  return summaries;
};

/*
Возвращает статистику всех статусов по миру по всем датам на 100 тыс. населения, массив объектов вида
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
*/
export const getDataWorld100 = async () => {
  const populationWorld = 7 * 10**9;
  const data = await getDataWorld();
  calc100Men(data, populationWorld);
  return data;
};

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
export const getDataCountry100 = async (country_slug) => {
  const data = await getDataCountry(country_slug);
  const population = await getPopulationCountry(country_slug);
  calc100Men(data, population);
  return data;
};


const calc100Men = (data, population) => {
  return data.map((el) => {
    el.Confirmed = el.Confirmed / (population / 10 ** 5);
    el.Deaths = el.Deaths / (population / 10 ** 5);
    el.Recovered = el.Recovered / (population / 10 ** 5);
    return el;
  });
}
