import {getPopulationCountry} from "../api/flags";
import {getDataCountry, getDataWorld} from "../api/covid";

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

export const getDataWorld100 = (data) => {
  const populationWorld = 7 * 10**9;
  return calc100Men(data, populationWorld);
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
export const getDataCountry100 = (data, population) => {
  return calc100Men(data, population);
};

const calc100Men = (data, population) => {
  return data.map((el) => {
    el.Confirmed = el.Confirmed / (population / 10 ** 5);
    el.Deaths = el.Deaths / (population / 10 ** 5);
    el.Recovered = el.Recovered / (population / 10 ** 5);
    return el;
  });
};
